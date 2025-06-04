const express = require("express");
const router = express.Router();
const Electrician = require("../Model/ElectricianSchema");

router.get("/electrician", async (req, res) => {
  try {
    const data = await Electrician.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
