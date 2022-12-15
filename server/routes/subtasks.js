const express = require("express")
const SubTaskRouter = express.Router()

const { verifyAccessToken } = require("../utils/auth")

const SubTask = require("../model/SubTask")



SubTaskRouter.delete(
    '/:id',
    verifyAccessToken,
    async(req,res)=>{
        try {
            const {id} = req.params
            
            const subtask = await SubTask.findById(id)

            if (subtask === null || subtask.deleted === true) {
                throw new Error(`Subtask doesn't exist`)
            }

            const updatedSubTask = await SubTask.findByIdAndUpdate(id, {deleted : true})

            await updatedSubTask.save()
            
            res.send({
                status: "ok"
            })

        } catch (error) {
            res.send({
                status: "error",
                error: `SubTaskError: ${error.message ? error.message : `Something broke editing SubTask`}`
            })  
        }
    }
)


SubTaskRouter.put(
    '/:id',
    verifyAccessToken,
    async(req,res)=>{
        try {
            const {id} = req.params

            const subtask = await SubTask.findById(id)

            if (subtask === null || subtask.deleted === true) {
                throw new Error(`Subtask doesn't exist`)
            }

            const updatedSubTask = await SubTask.findByIdAndUpdate(id, req.body)

            await updatedSubTask.save()
            
            res.send({
                status: "ok"
            })
        } catch (error) {
            res.send({
                status: "error",
                error: `SubTaskError: ${error.message ? error.message : `Something broke editing SubTask`}`
            })  
        }

    }
)


SubTaskRouter.get(
    '/:id',
    verifyAccessToken,
    async(req,res)=>{
        try {
            const {id} = req.params;
            const subTask = await SubTask.findById(id)

            if (subTask === null || subTask.deleted === true) {
                throw new Error(`Subtask doesn't exist`)
            }
            const {title, done} = subTask

            res.send({
                status: "ok",
                title,
                done
            })
        } catch (error) {
            res.send({
                status: "error",
                error: `SubTaskError: ${error.message ? error.message : `Something broke getting SubTask`}`
            })        
        }
    }
)


SubTaskRouter.post(
    '/',
    verifyAccessToken,
    async(req,res)=>{
        try {
            const {taskID, title} = req.body

            const newSubTask = new SubTask(
                {
                    task: taskID,
                    title: title
                }
            )
    
            await newSubTask.save()
    
            res.send({
                status: "ok",
                id: newSubTask._id
            })
        } catch (error) {
            res.send({
                status: "error",
                error: `SubTaskError: ${error.message ? error.message : `Something broke creating SubTask`}`
            })
        }
    }
)





module.exports = {
    SubTaskRouter
}