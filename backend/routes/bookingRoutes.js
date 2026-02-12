const express = require("express");
const bookingRoutes = express.Router();
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const {
  createBooking,
  getUserBookings,
  updateBookings,
  getAllBookings,
} = require("../controllers/bookingController");

bookingRoutes.post("/create", protect, createBooking);
bookingRoutes.get("/my-bookings", protect, getUserBookings);
bookingRoutes.get("/bookings", adminOnly, getAllBookings);
bookingRoutes.put("/update-status/:bookingId", adminOnly, updateBookings);

module.exports = bookingRoutes;
