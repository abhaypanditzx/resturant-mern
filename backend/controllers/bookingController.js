const Booking = require("../models/bookingModel.js");

const createBooking = async (req, res) => {
  const { name, phone, time, date, numberOfPeople, note } = req.body;
  try {
    const { id } = req.user;
    if (!name || !phone || !time || !date) {
      return res
        .status(400)
        .json({ msg: "all fields are required", success: false });
    }
    const existingBooking = await Booking.findOne({
      date,
      time,
      status: { $ne: "Cancelled" },
    });
    if (existingBooking) {
      return res
        .status(400)
        .json({ msg: "This time slot is already booked", success: false });
    }

    const booking = await Booking.create({
      user: id,
      name,
      phone,
      time,
      date,
      numberOfPeople,
      note,
    });
    res
      .status(201)
      .json({ msg: "Table booked successfully", success: true, booking });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const { id } = req.user;
    const bookings = await Booking.find({ user: id }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user", "name email");
    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "internal server error" });
  }
};

const updateBookings = async (req,res) => {
  try {
    console.log("update status route hit")
    const {bookingId} = req.params;
    const {status} = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404), json({ msg: "booking not found" });
    }
    booking.status = status;
    await booking.save();
    res
      .status(200)
      .json({ msg: "Booking  status updated ", success: true, booking });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  updateBookings,
  createBooking,
  getAllBookings,
  getUserBookings,
};
