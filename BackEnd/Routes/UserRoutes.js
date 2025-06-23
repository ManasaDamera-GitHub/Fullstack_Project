const express = require("express");
const { signUp } = require("../Controllers/authController");
const router = express.Router();

router.post("/signup", signUp);
router.get("/signup", signUp);
module.exports = router;
