const User = require("./../model/user");
const bcrypt = require("bcryptjs");
const createError = require("./error");
const jwt = require("jsonwebtoken");
const signUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    console.log(err);
    next(createError(404, "not found"));
  }
};
const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return next(createError(404, "Usr not found"));
    }

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(404, "Wrong pAssword"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const { password, ...others } = user._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        token,
        others,
      });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

const google = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signIn, signUp, google };
