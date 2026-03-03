const express = require("express");
const bookingRoutes = express.Router();
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const {
  createBooking,
  getUserBookings,
  updateBookings,
  getAllBookings,
  deleteBooking,
} = require("../controllers/bookingController");

bookingRoutes.post("/create", protect, createBooking);
bookingRoutes.get("/my-bookings", protect, getUserBookings);
bookingRoutes.get("/bookings", protect, adminOnly, getAllBookings);
bookingRoutes.put("/update-status/:bookingId", adminOnly, updateBookings);
bookingRoutes.put("/update-status/:bookingId", adminOnly, updateBookings);
bookingRoutes.put("/remove/:bookingId", adminOnly, deleteBooking);

module.exports = bookingRoutes;
