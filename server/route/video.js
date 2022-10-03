const router = require("express").Router();
const Video = require("./../controller/video");
const verifyToken = require("../verify");
router.route("/").post(verifyToken, Video.addVideo);
router.patch("/view/:id",User)
router.get("/random",User)
router.get("/trend",User)
router.get("/sub",User)
router
  .route("/:id")
  .patch(verifyToken, Video.updateVideo)
  .get(Video.getVideo)
  .delete(verifyToken, Video.deleteVideo);
module.exports = router;
