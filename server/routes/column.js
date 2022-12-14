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

        try {         
          await Column.findByIdAndUpdate(id, { deleted: true });
          
          res.send({ status: "ok" });
        } catch (error) {
          res.send({ 
            status: "error",
            error: `Something broke deleting column: ${error.message}` 
        });
        }
      
});

ColumnRouter.put(
    "/:id", 
    verifyAccessToken, 
    async (req, res) => {
        const { id } = req.params;
        try {
            const { name, colour } = req.body;
            
            await Column.findByIdAndUpdate(
                id, 
                {
                    name: name,
                    colour: colour
                }    
            )
            res.send({
                status: "ok",
            });
        } catch (error) {
            res.send({
                status: "error",
                error: `Error creating column: ${error.message}`
            });
        }
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

            if (column.length !== 1) {
                throw new Error(`Column not found`)
            }
            res.send({
                status: "ok",
                column: column[0]
            })

        } catch (error) {
            res.send({
                status: "error",
                error: `Error getting column: ${error}`
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
                error: `ColumnError: ${error.message ? error.message : "Error Creating Column"}`
            });
        }
});

module.exports = {
  ColumnRouter,
};
