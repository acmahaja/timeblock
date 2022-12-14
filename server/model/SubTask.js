const { Schema, model } = require("mongoose");

const SubTaskSchema = new Schema({
  task: {
    type: Schema.Types.ObjectId,
    ref: "Task",
    required: true
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

const SubTask = model("SubTask", SubTaskSchema);

module.exports = SubTask;
