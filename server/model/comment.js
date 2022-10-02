const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timeStamps: true,
  }
);

const Comment = mongoose.model("comments", commentSchema);

module.exports = Comment;
