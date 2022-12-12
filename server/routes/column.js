const express = require("express");
const ColumnRouter = express.Router();
const Column = require("../model/Column");
const {verifyColumn} = require("../controller/column")

const { verifyAccessToken } = require("../utils/auth");

ColumnRouter.delete(
    "/:id", 
    verifyAccessToken, 
    async (req, res) => {
    const { id } = req.params;

    res.send(`deleting column${id}`);
});

ColumnRouter.put(
    "/:id", 
    verifyAccessToken, 
    async (req, res) => {
        const { id } = req.params;

        res.send(`updating column${id}`);
});

ColumnRouter.get(
    "/:id", 
    verifyAccessToken, 
    async (req, res) => {
        try {
            const {id} = req.params
            const column = await Column.find({
                _id: id,
                deleted: false
            })

            if (column.length === 0) {
                throw new Error(`Column not found`)
            }
            res.send({
                status: "ok",
                ...column
            })
        } catch (error) {
            res.send({
                status: "error",
                message: `Error getting column: ${error}`
            })
        }
});

ColumnRouter.post(
    "/", 
    verifyAccessToken, 
    async (req, res) => {
        const { boardID, name, colour } = req.body;
        try {
            const verify = await verifyColumn(name, boardID);

            if (verify) 
                throw new Error("Column already exists");
            
            const newColumn = new Column({
                board: boardID,
                name: name,
                colour: colour
            })

            await newColumn.save()
            
            res.send({
                status: "ok",
                id: newColumn._id
            })

        } catch (error) {
            res.send({
                status: "error",
                message: `Error creating column: ${error.message}`
            });
        }
});

module.exports = {
  ColumnRouter,
};
