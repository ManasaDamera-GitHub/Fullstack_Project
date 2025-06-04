const express = require("express");
const router = express.Router();
const SmartLock = require("../Model/SmartLockSchema");

router.get("/smartlock", async (req, res) => {
  try {
    const data = await SmartLock.find();
    res.json(data);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

module.exports = router;
