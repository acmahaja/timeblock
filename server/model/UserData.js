const { Schema, model } = require("mongoose");

const UserDataSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  Message: {
    type: String,
    required:true 
  }
});

const UserData = model("UserData", UserDataSchema);

module.exports = UserData;