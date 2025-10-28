import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const loginUser = async (req, res) => {
  try {
    const { email, psw } = req.body;

    // 1. find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // 2. check password
    const isMatch = await bcrypt.compare(psw, user.psw);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // 3. Generate JWT token  <-- PASTE YOUR jwt.sign HERE
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 4. return token
    res.json({
      msg: "Login successful",
      token,
      user: { id: user._id, fullname: user.fullname, email: user.email }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
