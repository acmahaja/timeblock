const Board = require("../model/Board");


async function verifyBoard(name, userID){
    await Board.find({
        name: name,
        user: userID,
      }).then((result) => {
        if (result.length) 
          return false
      });
      return true
}

module.exports={verifyBoard}