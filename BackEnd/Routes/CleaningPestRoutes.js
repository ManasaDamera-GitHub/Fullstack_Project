const express = require("express");
const router = express.Router();
const CleaningPestRouter = require("../Model/CleaningPestSchema");

router.get("/cleaning", async (req, res) => {
  try {
    const data = await CleaningPestRouter.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
