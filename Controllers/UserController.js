const Users = require("../Models/UserModel");
const {NewUserValidation,UpdateUserValidation} = require("../validation");


//GET ALL UserS

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await Users.find();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};

//GET SINGLE User

const getUser = async (req, res, next) => {
  try {
    const singleUser = await Users.findById(req.params.id);
    res.status(200).json(singleUser);
  } catch (err) {
    next(err);
  }
};

//UPDATE User

const updateUser = async (req, res, next) => {
  const valid = UpdateUserValidation(req.body);
  if (valid.error) {
    res.status(400).json(valid.error.details[0].message);
  } else {
    try {
      const updateUser = await Users.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
  }
};

//DELETE User

const deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await Users.findByIdAndDelete(req.params.id);
    res.json(`${deleteUser.name} has been deleted`);
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = getAllUsers;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
