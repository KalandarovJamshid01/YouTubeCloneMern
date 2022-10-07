const Video = require("../model/video");
const Comment = require("./../model/comment");
const error = require("./error");
const addComment = async (req, res, next) => {
  const newComment = new Comment({ ...req.body, userId: req.user.id });

  try {
    const saveComment = await newComment.save();
    res.status(201).send(saveComment);
  } catch (error) {
    next(error);
  }
};
const getComment = async (req, res, next) => {
  try {
    const comments = await Comment.find({ videoId: req.params.videoId });
    console.log("comments");
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const video = await Video.findById(req.params.id);

    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await Comment.findOneAndDelete(req.params.id);
      res.status(202).json("Deleted");
    } else {
      return next(err(404, "you cn only your video"));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { addComment, deleteComment, getComment };
