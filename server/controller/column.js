const Column = require("../model/Column");

function saveColumns(columns, boardID){
    columns.forEach(async (column)=>{
        const newColumn = new Column({
          board: boardID,
          name: column
        })
        await newColumn.save()
      })
  
} 

module.exports = {saveColumns}