const { Schema, model } = require("mongoose");

const ColumnSchema = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
  name: {
    type: String,
    required: true,
  },

  deleted: {
    type: Boolean,
    default: false,
  },
});

const Column = model("Column", ColumnSchema)

module.exports = Column