const User = require("./../model/user");

const signUp = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};
const signIn = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

const google = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

module.exports = { signIn, signUp, google };
