import mongoose from "mongoose";

const QuizResultSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  level: { type: Number, required: true },
  score: Number,
  total: Number,
  questions: [
    {
      questionText: String,     // the actual question
      chosenAnswer: String,     // answer text chosen by user
      score: Number,            // 1 if correct, 0 if wrong
      timeSpent: Number         // time spent in seconds
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("QuizResult", QuizResultSchema);
