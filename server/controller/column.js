const Column = require("../model/Column");

async function verifyColumn(name, boardID) {
  const columnList = await Column.find({
    name: name,
    board: boardID,
  });

  if (columnList.length > 0) {
    console.log(true);
    return true;
  } else {
    return false;
  }
}

function saveColumns(columns, boardID) {
  if (!columns) {
    return;
  }
  let columnObjects = [];

  columns.forEach((column) => {
    if (
      !verifyColumn(column, boardID) ||
      columns.indexOf(column) !== columns.lastIndexOf(column)
    ) {
      throw new Error(`Column Exists or Duplicate`);
    }

    const newColumn = new Column({
      board: boardID,
      name: column,
    });

    columnObjects.push(newColumn);
  });

  return columnObjects;
}

module.exports = { saveColumns, verifyColumn };
