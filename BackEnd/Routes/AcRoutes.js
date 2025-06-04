const express = require("express");
const router = express.Router();
const ACService = require("../Model/AcServicesSchema");

router.get("/ac", async (req, res) => {
  try {
    const data = await ACService.find();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

module.exports = router;
