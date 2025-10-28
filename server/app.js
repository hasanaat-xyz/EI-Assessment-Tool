import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.js";
import quizRoutes from "./routes/quiz.js";
import aiReportRoutes from "./routes/aiReportRoutes.js";


dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/auth", authRoutes);   //  handles /register & /login
app.use("/api/quiz", quizRoutes);   //  handles /result & /results/:userId
app.use("/api/ai", aiReportRoutes);

// server.js (Node/Express)
app.post("/api/quizResults", async (req, res) => {
  const { userId, score, questionTimes, date } = req.body;
  const result = new QuizResult({ userId, score, questionTimes, date });
  await result.save();
  res.json({ success: true });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
