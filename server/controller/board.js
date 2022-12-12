const Board = require("../model/Board");

async function verifyBoard(name, userID) {
  await Board.find({
    name: name,
    user: userID,
  }).then((result) => {
    console.log(result.length);
    if (result.length) return false;
  });
  return true;
}

module.exports = { verifyBoard };
