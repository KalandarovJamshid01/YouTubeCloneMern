const jwt = require("jsonwebtoken");

const error = require("./controller/error");
module.exports = verifyToken = (req, res, next) => {
  const userToken = req.cookies.token;
  if (!userToken) {
    return next(error(401, "You are not login"));
  }

  jwt.verify(userToken, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(error(403, "Toke is invallid"));
    }
    req.user = user;
    next();
  });
};
 
