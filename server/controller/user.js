const User = require("../model/user");
const Video = require("../model/video");
const error = require("./error");

const getAll = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    return next(error(404, "not ffoun"));
  }
};
const update = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } else {
      return next(error(404, "not found"));
    }
  } catch (error) {
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      const updatedUser = await User.findByIdAndDelete(req.params.id);

      res.status(200).json("User Deleted");
    } else {
      return next(error(404, "not found"));
    }
  } catch (error) {
    return next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      const user = await User.findById(req.params.id);

      res.status(200).json(user);
    } else {
      return next(error(404, "not found"));
    }
  } catch (error) {
    return next(error);
  }
};
const subscribe = async (req, res, next) => {
  try {
    console.log(req.user);
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).json("Subscription succesfull");
  } catch (err) {
    return next(err);
  }
};
const unSubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).json("UnSubscription succesfull");
  } catch (error) {
    return next(err);
  }
};
const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    });
    res.status(200).json("The video been liked");
  } catch (error) {
    next(err);
  }
};
const disLike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;
  try {
    const video = await Video.findByIdAndUpdate(
      videoId,
      {
        $addToSet: { dislikes: id },
        $pull: { likes: id },
      },
      { new: true }
    );

    res.status(200).json({ video });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  update,
  deleteUser,
  getUser,
  subscribe,
  unSubscribe,
  like,
  disLike,
  getAll,
};

