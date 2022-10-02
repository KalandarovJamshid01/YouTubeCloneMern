const router = require("express").Router();
const User = require("./../controller/user");
router.get("/test", User.test);

module.exports = router;
