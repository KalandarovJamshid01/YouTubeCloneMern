const express = require("express");
const User = require("./../route/user");
const Video = require("./../route/video");
const Comment = require("./../route/comment");
const Auth = require("./../route/auth");

const app = express();
app.use(express.json());
// app.use("/api/v1/users", User);
// app.use("/api/v1/videos", Video);
// app.use("/api/v1/comments", Comment);
app.use("/api/v1/auth", Auth);

module.exports = app;
