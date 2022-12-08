const { Schema, model } = require("mongoose");

const SubTaskSchema = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
  },
  title: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

const Task = model("SubTask", SubTaskSchema);

module.exports = SubTask;
