const { Schema, model } = require("mongoose");

const BoardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: {
    type: String,
    required:true
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

const Board = model("Board", BoardSchema);

module.exports = Board;
