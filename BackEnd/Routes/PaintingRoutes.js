const express = require("express");
const router = express.Router();
const Painting = require("../Model/PaintingSchema");

router.get("/painting", async (req, res) => {
  try {
    const data = await Painting.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
