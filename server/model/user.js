const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    subscribers: {
      type: Number,
      deafult: 0,
    },

    subscribedUsers: {
      type: [String],
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
