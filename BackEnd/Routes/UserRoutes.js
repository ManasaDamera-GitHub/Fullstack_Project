const express = require("express");
const { signUp } = require("../Controllers/authController");
const router = express.Router();
const User = require("../Model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

router.post("/signup", signUp);

router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter both email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(token);
    res.status(200).json({
      message: "Login Successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log("Login error: ", error.message);
    res.status(500).json({ message: "Login failed" });
  }
});
module.exports = router;
