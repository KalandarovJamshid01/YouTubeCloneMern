const router = require("express").Router();
const auth = require("./../controller/auth");
router.route("/signin").post(auth.signIn);
router.route("/signup").post(auth.signUp);
router.route("/google").post(auth.google);
module.exports = router;
