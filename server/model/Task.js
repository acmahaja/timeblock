const { Schema, model } = require("mongoose");

const TaskSchema = new Schema({
  column: {
    type: Schema.Types.ObjectId,
    ref: "Column",
  },
  title: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    length: 1,
    required: true,
  },
  description: {
    type: String,
    required: false
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Task = model("Task", TaskSchema);

module.exports = Task;
