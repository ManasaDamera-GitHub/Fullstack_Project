const express = require("express");
const router = express.Router();
const Men = require("../Model/MenSchema");

router.get("/men", async (req, res) => {
  try {
    const data = await Men.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
