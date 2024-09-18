const booking = require("../models/book");
const createError = require("../utils/error");

//Create a booking
const createBooking = async (req, res, next) => {
  const newUser = new booking(req.body);

  try {
    const saveduser = await newUser.save();
    res.status(200).json(saveduser);
  } catch {
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
    const singleHotel = await booking.findById(
      req.params.id,
    );
    res.status(200).json(singleHotel);
  } catch {
    next(createError(500, "500 error"));
  }
};

//Delete bookings
const deleteBooking = async (req, res) => {
  try {
    await booking.findByIdAndDelete(
      req.params.id,
    );
    res.status(200).json("Hotel has been deleted");
  } catch {
    next(createError(500, "500 error"));
  }
};

//Get all Bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await booking.find();
    res.status(200).json(bookings);
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