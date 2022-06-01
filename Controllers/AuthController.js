const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const {
  UserRegisterValidation,
  UserLoginValidation,
} = require("../validation");

const register = async (req, res, next) => {
  //Check Valid User
  const validUser = UserRegisterValidation({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  if (validUser.error) {
    res.status(500).json(validUser.error.details[0].message);
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });
    try {
      const addUser = await newUser.save();
      const { password, updatedAt, ...others } = addUser._doc;
      res.status(200).json(others);
    } catch (err) {
      next(err);
    }
  }
};
const login = async (req, res, next) => {
  //Check Valid User
  const validUser = UserLoginValidation({
    username: req.body.username,
    password: req.body.password,
  });
  if (validUser.error) {
    res.status(500).json(validUser.error.details[0].message);
  } else {
    try {
      //Check if user exist
      const localUser = await User.findOne({ username: req.body.username });
      if (!localUser) {
        res.status(500).json("User does not exist");
      } else {
        //Check if password is correct
        const passwordCheck = await bcrypt.compare(
          req.body.password,
          localUser.password
        );
        if (!passwordCheck) {
          res.status(500).json("incorrect password");
        } else {
          const { password,isAdmin, ...others } = localUser._doc;
          res.status(200).json(others);
        }
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports.register = register;
module.exports.login = login;
