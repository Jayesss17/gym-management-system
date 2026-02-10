const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// =====================
// SIGNUP
// =====================
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password manually
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    res.json({ message: "Signup successful" });

  } catch (err) {
    console.log("Signup error:", err.message);
    res.status(500).json({ message: "Signup failed" });
  }
});


// =====================
// LOGIN
// =====================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) 
      return res.status(400).json({ message: "User not found" });

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) 
      return res.status(400).json({ message: "Wrong password" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    console.log("Login error:", err.message);
    res.status(500).json({ message: "Login failed" });
  }
});


module.exports = router;
