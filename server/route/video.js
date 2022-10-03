const router = require("express").Router();
const Video = require("./../controller/video");
const verifyToken = require("../verify");
router.route("/").post(verifyToken, Video.addVideo);
router.patch("/view/:id", verifyToken, Video.updateVideo);
router.get("/random", Video.random);
router.get("/trend", Video.trend);
router.get("/sub", verifyToken, Video.sub);
router.get("/tags", verifyToken, Video.getByTag);
router.get("/search", verifyToken, Video.search);
router
  .route("/:id")
  .patch(verifyToken, Video.updateVideo)
  .get(Video.getVideo)
  .delete(verifyToken, Video.deleteVideo);
module.exports = router;
