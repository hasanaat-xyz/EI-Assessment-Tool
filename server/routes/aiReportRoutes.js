import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import verifyToken from "../middleware/authMiddleware.js"; // ✅ protect the route if needed
import User from "../models/User.js";

dotenv.config();
const router = express.Router();

router.post("/generateReport", verifyToken, async (req, res) => {
  const { totalScore, levelDetails } = req.body;

  // Get username from token (middleware adds user info)
  const userId = req.user.user_id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const prompt = `
You are a fun and friendly Emotional Intelligence (EI) coach.
Generate a personalized report for ${user.fullname}.
They scored ${totalScore} points overall.

Here are their level details:
${JSON.stringify(levelDetails, null, 2)}

Please:
- Highlight strong areas.
- Point out areas to improve.
- Suggest fun, practical activities (games, journaling, roleplay, challenges).
- Keep it encouraging and engaging.
- End with a motivational quote about emotional growth.
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      { contents: [{ parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    const report = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Save to DB
    user.lastReport = report;
    user.lastScore = totalScore;
    user.levelDetails = levelDetails;
    await user.save();

    res.json({ report });
  } catch (error) {
    console.error("AI Report Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate AI report" });
  }
});

export default router;
