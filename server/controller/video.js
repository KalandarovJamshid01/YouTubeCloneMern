const User = require("../model/user");
const Video = require("./../model/video");
const err = require("./error");
const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });

  try {
    const savedVideo = await newVideo.save();
    res.status(201).json("succesfull");
  } catch (error) {
    return next(err);
  }
};
const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return next(err(404, "not found"));
    }
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findById(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(203).json("updated Video");
    }
  } catch (error) {
    next(err);
  }
};
const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(err);
  }
};
const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("view inc");
  } catch (error) {
    next(err);
  }
};
const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (error) {
    next(err);
  }
};
const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (error) {
    next(err);
  }
};
const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChanels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChanels.map((chanelId) => {
        return Video.find({ userId: chanelId });
      })
    );
    res.status(200).json(
      list.flat().sort((a, b) => {
        b.createdAt - a.createdAt;
      })
    );
  } catch (error) {
    next(err);
  }
};
const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");

  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (error) {
    next(err);
  }
};
const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({ title: { $regex: query, $options: "i" } });
    res.status(200).json(videos);
  } catch (error) {
    next(err);
  }
};

const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return next(err(404, "not found"));
    }
    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(203).json("delete Video");
    }
  } catch (error) {
    next(err);
  }
};

module.exports = {
  addVideo,
  getVideo,
  deleteVideo,
  updateVideo,
  addVideo,
  random,
  trend,
  sub,
  getByTag,
  search,
};
