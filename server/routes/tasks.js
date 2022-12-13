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
    (req,res)=>{
        res.send('Deleting Task')
    }
)

TasksRouter.put(
    '/:id',
    verifyAccessToken,
    (req,res)=>{
        res.send('editing Task')
    }
)

TasksRouter.get(
    '/:id',
    verifyAccessToken,
    (req,res)=>{
        res.send('getting Task')
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

            await newTask.save()
            
            let subTasks = parseArray(req.body.Subtasks);
            subTasks = createSubTasksInstances(subTasks, newTask._id)
            
            subTasks.forEach(async (subTask)=>{
                await subTask.save()
            })

            

            res.send({status: "ok", id: newTask._id})
        } catch (error) {
            res.send({
                status: "error",
                message: `Error: Error creating Task ${error.message}`
            })
        }
    }
)


module.exports = {TasksRouter}