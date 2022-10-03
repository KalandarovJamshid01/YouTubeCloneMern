const router = require("express").Router();
const cookieParser = require("cookie-parser");
const Comment = require("./../controller/comment");

const verify = require("./../verify");

router.route("/").post(verify, Comment.addComment);
router.delete("/:id", verify, Comment.deleteComment);
router.get("/:videoId", Comment.getComment);
module.exports = router;
