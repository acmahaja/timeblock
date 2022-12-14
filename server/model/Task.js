const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  board: {
    type: Schema.Types.ObjectId,
    ref: "Board",
    required: true
  },
  title: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    length: 1,
  },
  description: {
    type: String,
    required: false
  },
  column: {
    type: Schema.Types.ObjectId,
    ref: "Column",
    required: true
  },
  
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Task = model("Task", TaskSchema);

module.exports = Task;
