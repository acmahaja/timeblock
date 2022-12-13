const express = require("express");
const BoardRouter = express.Router();

const User = require("../model/User");
const Board = require("../model/Board");
const Task = require("../model/Task");
const { verifyAccessToken } = require("../utils/auth");
const { parseArray } = require("../utils/stringTools");

const dotenv = require("dotenv");
const { model, Error } = require("mongoose");
const { createColumnInstances } = require("../controller/column");
const { verifyBoard } = require("../controller/board");
const Column = require("../model/Column");

dotenv.config();

BoardRouter.delete("/:id", verifyAccessToken, async (req, res) => {
  const { id } = req.params;

  try {
    const board = await Board.findById(id)
    if (board.name === "To Do") {
      throw new Error('Can\'t delete To Do Board')
    }
    
    await Board.findByIdAndUpdate(id, { deleted: true });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error", message: `Something broke deleting board: ${error.message}` });
  }

});

BoardRouter.put("/:id", verifyAccessToken, async (req, res) => {
  const { id } = req.params;

  try {
    await Board.findByIdAndUpdate(id, { name: req.body.name });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error", message: "Something broke updating board" });
  }
});

BoardRouter.get("/:id", verifyAccessToken, async (req, res) => {
  try {
    const { id } = req.params;
    let boardObject;
    const board = await Board.findOne({ _id: id, deleted: false });

    boardObject = { name: board };

    let columns = await Column.find({ board: board._id });

    let columnObject = [];

    columns.forEach((column) => {
      const tasks = Task.find({ column: column._id });
      columnObject.push({ id: column._id, name: column.name });
    });

    res.send({ status: "ok", ...boardObject, columns: columnObject });
  } catch (error) {
    res.send({
      status: "error",
      message: `Something broke getting your board`,
    });
  }
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

    let { name, columns } = req.body;

    if ((await verifyBoard(name, user._id)) > 0) {
      throw new Error("Board Exist");
    }

    const newBoard = new Board({ user: user._id, name: name, deleted: false });

    if (columns) {
      columns = parseArray(columns);
      columns = createColumnInstances(columns, newBoard._id);
    }

    newBoard.save();
    columns.forEach(async (column) => column.save());

    res.send({ status: "ok", board_id: newBoard._id });
  } catch (error) {
    res.send({ status: "error", message: `Error Creating board: ${error.message}` });
  }
});

module.exports = { BoardRouter };
