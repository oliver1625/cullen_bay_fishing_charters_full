const bcrypt = require("bcryptjs/dist/bcrypt");
const User = require("../models/user");
const createError = require("../utils/error");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  const existingNumber = await User.findOne({
    phone_number: req.body.phone_number,
  });

  let errorType = '';

    if (existingUser && existingNumber) {
      errorType = 'emailAndNumber';
    } else if (existingUser) {
      errorType = 'email';
    } else if (existingNumber) {
      errorType = 'number';
    }

    switch (errorType) {
      case 'email':
        return res.status(400).json({ message: 'Email already exists.' });
      case 'number':
        return res.status(400).json({ message: 'Phone Number already exists.' });
      case 'emailAndNumber':
        return res.status(400).json({ message: 'Email and Phone Number already exist.' });
      default:
    }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    email: req.body.email,
    password: hash,
  });
  try {
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    res.status(500).json(err);
  }
};


const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) return next(createError(404, "User not Found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Password maybe wrong"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails, token });
  } catch (err) {
    next(createError(500, "Missing"));
  }
};

const logout = async (req, res, next) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      sameSite: "strict", // Ensure cookie is sent only from the same site
    })
    .status(200)
    .json({ message: "You has been logged out." });
};

module.exports = {
  register,
  login,
  logout,
};
