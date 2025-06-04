const express = require("express");
const router = express.Router();
const WallPanel = require("../Model/WallPanelSchema");

router.get("/", async (req, res) => {
  try {
    const data = await WallPanel.find();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
