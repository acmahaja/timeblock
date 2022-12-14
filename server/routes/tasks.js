const express = require("express")
const TasksRouter = express.Router()
const { verifyAccessToken } = require("../utils/auth")

const {verifyColumnID} = require("../controller/column")
const {verifyBoardID} = require("../controller/board") 
const {createSubTasksInstances} = require("../controller/subtasks")

const { parseArray } = require("../utils/stringTools");


const Task = require("../model/Task")
const User = require("../model/User")
const SubTask = require("../model/SubTask")

TasksRouter.delete(
    '/:id',
    verifyAccessToken,
    async (req,res)=>{
        try {

            const taskID = req.params.id

            const updatedTask = await Task.findByIdAndUpdate(taskID,
                {
                    deleted : true
                })

            if (updatedTask === null || updatedTask.deleted === true) {
                throw new Error("Task not found")
            }
    
            
            let subTasks = await SubTask.find({
                task: taskID,
                deleted: false
            })   
            
            
            await updatedTask.save()

            subTasks.forEach(async (subTask)=>{
                subTask.deleted = true;

                await subTask.save()
            })

            res.send({
                status: "ok"
            })
    

        } catch (error) {
            res.send({
                status: "error",
                error: `TaskError: ${error.message ? error.message : `Error editing Task`}`
            })
        }
    }
)

TasksRouter.put(
    '/:id',
    verifyAccessToken,
    async (req,res)=>{
        try {

            const taskID = req.params.id

            const updatedTask = await Task.findByIdAndUpdate(taskID,
                {
                    title: req.body.title,
                    emoji: req.body.emoji,
                    description: req.body.description,
                    column: req.body.columnID,
                    board: req.body.boardID,
                })
            
            let subTasks = await SubTask.find({
                task: taskID,
                deleted: false
            })   
            
            subTasks.forEach(async subtask => await subtask.delete())

            subTasks = parseArray(req.body.Subtasks);
            subTasks = createSubTasksInstances(subTasks, taskID)
            
            await updatedTask.save()

            subTasks.forEach(async (subTask)=>{
                await subTask.save()
            })

            res.send({
                status: "ok"
            })
    

        } catch (error) {
            res.send({
                status: "Error",
                error: `TaskError: ${error.message ? error.message : `Error editing Task`}`
            })
        }
    }
)



TasksRouter.get(
    '/:id',
    verifyAccessToken,
    async (req,res)=>{
        try {

            const task = await Task.findById(req.params.id)
            
            if (task === null || task.deleted === true) {
                throw new Error("Task not found")
            }

            if(task.length >1){
                throw new Error("Duplicate Tasks with same ID found")
            }


            const subTasks = await SubTask.find({
                task: task.id,
                deleted: false
            })
            
            res.send({
                status: 'ok',
                task: task,
                subtasks: subTasks
            })

        } catch (error) {
            
            res.send({status: 'error', error: `TaskError: ${error.message}`})
        }
        

    }
)

TasksRouter.post(
    '/',
    verifyAccessToken,
    async (req,res)=>{
        try {
            const validBoard = await verifyBoardID(req.body.boardID);

            const validColumn = await verifyColumnID(req.body.columnID)

            if (!validBoard) {
                throw new Error('Board not found')
            }

            if(!validColumn){
                throw new Error('Column not found')
            }
            

            let newTask = new Task({
                title: req.body.title,
                emoji: req.body.emoji,
                description: req.body.description,
                column: req.body.columnID,
                board: req.body.boardID,
            })
            
            
            let subTasks = parseArray(req.body.Subtasks);
            subTasks = createSubTasksInstances(subTasks, newTask._id)
            
            await newTask.save()
            subTasks.forEach(async (subTask)=>{
                await subTask.save()
            })

            res.send({status: "ok", id: newTask._id})

        } catch (error) {
            res.send({
                status: "error",
                error: `TaskError: ${error.message ? error.message : "Error creating Task"}`
            })
        }
    }
)


module.exports = {TasksRouter}