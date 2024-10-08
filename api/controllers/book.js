const booking = require("../models/book");
const createError = require("../utils/error");
const sendConfirmationEmail = require("../utils/mail");

//Create a booking
const createBooking = async (req, res, next) => {
  const id = req.params.id;
  const newUser = new booking(req.body);
  console.log(req.body);
  newUser["userId"] = id;
  newUser["email"] = req.body.email;
  newUser["first_name"] = req.body.first_name;

  try {
    const saveduser = await newUser.save();
    await sendConfirmationEmail(req.body.email, req.body.first_name);
    res.status(200).json(saveduser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Update a booking
const updateBooking = async (req, res, next) => {
  try {
    const updatedBooking = await booking.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch {
    next(createError(500, "500 error"));
  }
};

//Get individual Bookings
const getBooking = async (req, res, next) => {
  try {
    const singleBooking = await booking.findById(req.params.id);
    res.status(200).json(singleBooking);
  } catch {
    next(createError(500, "500 error"));
  }
};

//Delete bookings
const deleteBooking = async (req, res, next) => {
  try {
    await booking.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking has been deleted");
  } catch {
    next(createError(500, "500 error"));
  }
};

//Get all Bookings
const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await booking.find();
    res.status(200).json(bookings);
    // console.log(bookings)
  } catch {
    next(createError(500, "500 error"));
  }
};

module.exports = {
  createBooking,
  updateBooking,
  getBooking,
  deleteBooking,
  getAllBookings,
};
