const router = require("express").Router();
const User = require("./../controller/user");
const verifyToken = require("./../verify");

router.route("/").get(User.getAll);

router.route("/sub/:id").patch(verifyToken, User.subscribe);
router.patch("unsub/:id", verifyToken, User.unSubscribe);
router.patch("/like/:videoId", verifyToken, User.like);
router.patch("/dislike/:videoId", verifyToken, User.disLike);
router.use("/:id", User.getOne);
router
  .route("/:id")
  .get(verifyToken, User.getUser)
  .patch(verifyToken, User.update)
  .delete(verifyToken, User.deleteUser);
module.exports = router;
