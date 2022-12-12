const Board = require("../model/Board");

async function verifyBoard(name, userID) {
  let boards = await Board.find({
    name: name,
    user: userID,
  });
  return boards.length;
}

module.exports = { verifyBoard };
