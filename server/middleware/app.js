const express = require("express");
const User = require("./../route/user");
const Video = require("./../route/video");
const Comment = require("./../route/comment");
const Auth = require("./../route/auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/v1/users", User);
app.use("/api/v1/videos", Video);
app.use("/api/v1/comments", Comment);
app.use("/api/v1/auth", Auth);
app.use((err, req, res, next) => {
  const status = err.status || 404;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status: status,
    message: message,
  });
});
module.exports = app;
