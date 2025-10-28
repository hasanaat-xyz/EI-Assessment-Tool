import express from "express";
import QuizResult from "../models/QuizResult.js";

const router = express.Router();

/**
 * POST /quiz/result
 * Body: {
 *   userId,
 *   level,
 *   userAnswers: [number],       // indexes of chosen options
 *   timePerQuestion: [number],   // in seconds
 *   quizQuestions: [             // array of question objects for this level
 *     { question: "text", options: ["a","b","c"], correctIndex: 0 }
 *   ]
 * }
 */
router.post("/result", async (req, res) => {
  console.log("Incoming quiz data:", req.body);

  try {
    const { userId, level, userAnswers, timePerQuestion, quizQuestions } = req.body;

    if (!quizQuestions || !userAnswers) {
      return res.status(400).json({ msg: "Quiz questions and user answers are required" });
    }

    // Map user answers to full question objects
    const questionsData = quizQuestions.map((q, i) => ({
      questionText: q.question,
      chosenAnswer: q.options[userAnswers[i]],
      score: userAnswers[i] === q.correctIndex ? 1 : 0,
      timeSpent: timePerQuestion[i] || 0
    }));

    // Calculate total score
    const totalScore = questionsData.reduce((sum, q) => sum + q.score, 0);

    // Save to MongoDB
    const result = new QuizResult({
      userId,
      level,
      score: totalScore,
      total: quizQuestions.length,
      questions: questionsData
    });

    await result.save();
    res.json({ msg: "Result saved successfully", result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all results for a user
router.get("/results/:userId", async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.params.userId });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
