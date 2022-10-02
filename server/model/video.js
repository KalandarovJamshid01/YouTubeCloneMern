const mongoose = require("mongoose");

const videoSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },

    tags: {
      type: [String],
      default: [],
    },

    likes: {
      type: [String],
      deafult: 0,
    },
    disLikes: {
      type: [String],
      deafult: 0,
    },
  },
  {
    timeStamps: true,
  }
);

const Video = mongoose.model("videos", videoSchema);

module.exports = Video;
