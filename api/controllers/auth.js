const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../models/user");
const createError = require("../utils/error");
const jwt  = require("jsonwebtoken")

const register = async (req, res, next) => {
  try {

   const salt = bcrypt.genSaltSync(10);
   const hash  = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    res.status(500).json(err);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
        username: req.body.username
    })

    if(!user) return next(createError(404, "User not Found"))
    
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    if(!isPasswordCorrect) return next(createError(400, "Password maybe wrong"))
        
    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT);

    const {password, isAdmin, ...otherDetails} = user._doc;
    res
    .cookie("access_token", token, {
        httpOnly: true,
    })
    .status(200)
    .json({...otherDetails});
  } catch (err) {
    next(createError(500, "Missing"))
  }
};

module.exports = {
  register,
  login
};
