import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import QuizResult from "../models/QuizResult.js";

const router = express.Router();

// 🧠 Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Save user (plain password, not secure!)
    user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// 🔑 Login user (plain password)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ msg: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (user.password !== password) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "7d" });

    res.json({ user, token });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ✅ Save quiz result
router.post("/result", async (req, res) => {
  try {
    const { userId, score, total, answers, timePerQuestion, level } = req.body;

    if (!userId) return res.status(400).json({ msg: "Missing userId" });

    const result = new QuizResult({
      userId,
      score: score || 0,
      total: total || 5,
      answers: answers || [],
      timePerQuestion: timePerQuestion || [],
      level: level || 1,
    });

    await result.save();
    res.json({ msg: "✅ Result saved successfully", result });
  } catch (err) {
    console.error("❌ Error saving result:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// ✅ Get all results for a user
router.get("/results/:userId", async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching results:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
