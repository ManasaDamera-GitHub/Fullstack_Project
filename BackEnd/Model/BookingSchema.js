const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  serviceId: String,
  serviceTitle: String,
  professionalId: String,
  professionalName: String,
  date: String,
  time: String,
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Booking", bookingSchema);
