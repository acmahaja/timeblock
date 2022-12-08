const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  join_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  
});

const User = model("User", userSchema);

module.exports = User;
