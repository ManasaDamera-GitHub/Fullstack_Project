// const express = require("express");
// const mongoose = require("mongoose");
// const router = express.Router();
// const Booking = require("../Model/BookingSchema");

// router.post("/bookings", async (req, res) => {
//   try {
//     const newBooking = new Booking(req.body);
//     await newBooking.save();
//     res
//       .status(201)
//       .json({ message: "Booking successful", booking: newBooking });
//   } catch (error) {
//     res.status(500).json({ error: "Booking Failed" });
//   }
// });

// module.exports = router;

// backend/routes/Bookings.js
const express = require("express");
const router = express.Router();
const Professional = require("../Model/ProfessionalSchema");

// Add a booking
router.post("/", async (req, res) => {
  const { userName, date, time, professionalId } = req.body;
  if (!userName || !date || !time || !professionalId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    const professional = await Professional.findById(professionalId);
    if (!professional)
      return res.status(404).json({ error: "Professional not found" });

    const newBooking = { userName, date, time };
    professional.bookings.push(newBooking);
    await professional.save();

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// Cancel a booking
router.put("/cancel", async (req, res) => {
  const { professionalId, bookingId } = req.body;
  try {
    const professional = await Professional.findById(professionalId);
    if (!professional)
      return res.status(404).json({ error: "Professional not found" });

    const booking = professional.bookings.id(bookingId);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    booking.status = "cancelled";
    await professional.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Error cancelling booking" });
  }
});

module.exports = router;
