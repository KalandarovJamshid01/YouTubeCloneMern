const User = require("../model/user");
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
    return next(err);
  }
};
const subscribe = async (req, res, next) => {
  try {
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
const like = (req, res, next) => {
  try {
  } catch (error) {
    return next(err);
  }
};
const disLike = (req, res, next) => {
  try {
  } catch (error) {
    return next(err);
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
