const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: String,
    serviceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    serviceType: String,
    serviceTitle: String,
    professionalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Professional",
    },
    professionalName: String,
    price: Number,
    date: String,
    time: String,
    address: String,
    notes: String,
    paymentType: String,
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
