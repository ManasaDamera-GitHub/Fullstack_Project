const express = require("express");
const router = express.Router();
const WomenSpa = require("../Model/WomenSpaSchema");

router.get("/womenSpa", async (req, res) => {
  try {
    const data = await WomenSpa.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

module.exports = router;
