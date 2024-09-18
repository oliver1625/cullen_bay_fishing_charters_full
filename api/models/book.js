const mongoose = require("mongoose");

// const { Schema } = mongoose;

// const schema = Schema()

const BookSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", BookSchema)