const { Schema, model } = require("mongoose");

const BoardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    ref: "User",
    required:true
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

const Board = model("Board", BoardSchema);

module.exports = Board;
