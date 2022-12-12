const Column = require("../model/Column");

async function verifyColumn(name, boardID) {
  await Column.find({
    name: name,
    board: boardID,
  }).then((result) => {
    if (result.length) return false;
  });
  return true;
}

function saveColumns(columns, boardID) {
  if (!columns) {
    return;
  }
  let columnObjects = [];

  columns.forEach((column) => {
    if (
      !verifyColumn(column, boardID) || columns.indexOf(column) !== columns.lastIndexOf(column)
    ) {
      throw new Error(`Column Exists or Duplicate`);
    }

    const newColumn = new Column({
      board: boardID,
      name: column,
    });
    
    columnObjects.push(newColumn)
    
  });

  return columnObjects;
}

module.exports = { saveColumns };
