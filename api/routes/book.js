const { Router } = require("express");
const booking = require("../models/book");
const { createError } = require("../utils/error");
const {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getBooking,
} = require("../controllers/book");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");

const router = Router();

//Create bookings
router.post("/", verifyUser, createBooking);
router.put("/:id", verifyUser, updateBooking);
router.delete("/:id", verifyUser, deleteBooking);
router.get("/:id", verifyUser, getBooking);
router.get("/", verifyAdmin, getAllBookings);

// //GET
// router.get("/:id", async (req, res) => {
//   try {
//     const book = await booking.findById(req.params.id);
//     res.status(200).json(book);
//   } catch {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
