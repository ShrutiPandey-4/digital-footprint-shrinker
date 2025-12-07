const express = require("express");
const User = require("./user.model");

const router = express.Router();

// SIGNUP API
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = await User.create({ fullName, email, password });

    res.status(201).json({
      message: "Signup successful",
      user: newUser
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


// LOGIN API  
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // PASSWORD CHECK HERE
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;

