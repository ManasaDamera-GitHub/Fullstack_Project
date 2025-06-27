const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  name: String,
  comment: String,
});

const professionalSchema = new mongoose.Schema({
  name: String,
  photo: String,
  rating: Number,
  experience: String,
  location: String,
  servicesOffered: [String],
  bio: String,
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Professional", professionalSchema);
