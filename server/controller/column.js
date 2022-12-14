const Column = require("../model/Column");

async function verifyColumnID(columnID) {
  let column = await Column.findById(columnID)

  return column !== null;
}

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

function createColumnInstances(columns, boardID) {
  if (!columns) {
    return;
  }
  let columnInstances = [];

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

    columnInstances.push(newColumn);
  });

  return columnInstances;
}

module.exports = { createColumnInstances, verifyColumn, verifyColumnID };
