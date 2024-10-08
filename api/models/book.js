const mongoose = require("mongoose");


const BookSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  numberofParticipants: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Booking", BookSchema)