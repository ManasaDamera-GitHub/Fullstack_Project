const express = require("express");
const router = express.Router();
const WomenService = require("../Model/WomenSchema");
const WomenSpa = require("../Model/WomenSpaSchema");

router.get("/women", async (req, res) => {
  try {
    const data = await WomenService.find();
    res.json(data);
  } catch (err) {
    console.error(err, "this");
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

module.exports = router;
