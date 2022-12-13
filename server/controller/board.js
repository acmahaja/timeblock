const Board = require("../model/Board");

async function verifyBoardID(boardID) {
  let board = await Board.findById(boardID);

  return board !== null;
}


async function verifyBoard(name, userID) {
  let boards = await Board.find({
    name: name,
    user: userID,
  });
  return boards.length;
}

module.exports = { verifyBoard, verifyBoardID };
