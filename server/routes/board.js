const express = require("express");
const BoardRouter = express.Router();

const User = require("../model/User");
const Board = require("../model/Board");
const { verifyAccessToken } = require("../utils/auth");
const { parseColumns } = require("../utils/stringTools");


const dotenv = require("dotenv");
const { model, Error } = require("mongoose");
const { saveColumns } = require("../controller/column");
const { verifyBoard } = require("../controller/board");


dotenv.config();

BoardRouter.delete("/:id", verifyAccessToken, (req, res) => {
  const { id } = req.params;
  res.send(`deleting ${id}`);
});

BoardRouter.put("/:id", verifyAccessToken, (req, res) => {
  const { id } = req.params;
  res.send(`editing ${id}`);
});

BoardRouter.get("/:id", verifyAccessToken, (req, res) => {
  const { id } = req.params;
  res.send(`getting ${id}`);
});

BoardRouter.post("/", verifyAccessToken, async (req, res) => {
  try {
    if (req.body.name === "To Do") {
      throw new Error("Can't create To Do Board");
    }

    const user = await User.findOne({
      email: res.locals.decoded.email,
    });

    if (user === null) {
      throw new Error("User doesn't exist");
    }

    let {name, columns} = req.body;

    if (await verifyBoard(name, user._id)>0) {
      throw new Error('Board Exist')
    }

    const newBoard = new Board({ user: user._id,  name: name});    

    
    if (columns) {      
      columns = parseColumns(columns);
      columns = saveColumns(columns, newBoard._id)
    }

    newBoard.save()
    columns.forEach(async column => column.save())
    
    res.send({ status: "ok", board_id: newBoard._id });
  } catch (error) {
    res.send({ status: "error", message: `Error Creating board ${error}` });
  }
});

module.exports = { BoardRouter };
