const { Schema, model } = require("mongoose");

const ColumnSchema = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  colour: {
    type: String,
    length: 6,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Column = model("Column", ColumnSchema)

module.exports = Column