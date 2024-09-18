const User = require("../models/user");


//Update a Users
const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch {
    res.status(500).json(err);
  }
};

//Get individual users
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch {
    res.status(500).json(err);
  }
};

//Delete users
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch {
    res.status(500).json(err);
  }
};

//Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch {
    res.status(500).json(err);
  }
};

module.exports = {
  updateUser,
  getUser,
  deleteUser,
  getAllUsers,
};
