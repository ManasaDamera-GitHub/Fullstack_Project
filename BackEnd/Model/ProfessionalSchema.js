// const mongoose = require("mongoose");
// const reviewSchema = require("../Model/ReviewSchema");

// const ProfessionalSchema = new mongoose.Schema({
//   id: String,
//   name: String,
//   photo: String,
//   rating: Number,
//   experience: String,
//   location: String,
//   servicesOffered: Array,
//   bio: String,
//   reviews: [reviewSchema],
// });

// module.exports = mongoose.model("professional", ProfessionalSchema);

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  comment: String,
});

const bookingSchema = new mongoose.Schema({
  userName: String,
  date: String,
  time: String,
  status: { type: String, default: "confirmed" },
});

const professionalSchema = new mongoose.Schema({
  name: String,
  photo: String,
  rating: Number,
  experience: String,
  id: String,
  location: String,
  servicesOffered: [],
  bio: String,
  reviews: [reviewSchema],
  bookings: [bookingSchema],
});

module.exports = mongoose.model("Professional", professionalSchema);
