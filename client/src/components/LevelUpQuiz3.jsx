import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import levelUpData3 from "../data/levelUpData3"; // Level 3 questions

export default function Level3Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, level1Results, level2Results } = location.state || {};
  if (!currentUser) navigate("/login");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [stage, setStage] = useState("quiz");

  const handleSelect = (index) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    setUserAnswers([...userAnswers, index]);
    setQuestionTimes([...questionTimes, timeSpent]);

    if (currentQuestion + 1 === levelUpData3.length) {
      setStage("complete");
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setStartTime(Date.now());
    }
  };

  const handleShowReport = async () => {
    try {
      await axios.post("http://localhost:5000/api/quiz/result", {
        userId: currentUser._id,
        level: 3,
        userAnswers,
        timePerQuestion: questionTimes,
        quizQuestions: levelUpData3.map((q) => ({
          question: q.question,
          options: q.options,
          correctIndex: q.answer,
        })),
      });

      const level3Data = {
        level: 3,
        score: userAnswers.reduce(
          (sum, ans, i) => sum + (ans === levelUpData3[i].answer ? 1 : 0),
          0
        ),
        total: levelUpData3.length,
        questions: levelUpData3.map((q, i) => ({
          questionText: q.question,
          chosenAnswer: q.options[userAnswers[i]],
          score: userAnswers[i] === q.answer ? 1 : 0,
          timeSpent: questionTimes[i],
        })),
      };

      navigate("/eq-report", { state: [level1Results, level2Results, level3Data] });
    } catch (err) {
      console.error("Error saving Level 3 result:", err);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 to-violet-600 text-white p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {stage === "quiz" && (
        <>
          <h2 className="text-3xl font-bold mb-6">Level 3: Empathy & Relationships 💞</h2>
          <div className="bg-white/20 p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h3 className="text-lg mb-4">{levelUpData3[currentQuestion].question}</h3>
            <div className="flex flex-col space-y-3">
              {levelUpData3[currentQuestion].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className="bg-white/20 hover:bg-white/30 py-2 rounded-lg transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-6 text-sm opacity-80">
            Question {currentQuestion + 1} of {levelUpData3.length}
          </p>
        </>
      )}

      {stage === "complete" && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-white/20 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-4">🎉 Level 3 Completed!</h2>
          <p className="text-xl mb-2">
            You scored{" "}
            <span className="font-bold">
              {userAnswers.reduce(
                (sum, ans, i) => sum + (ans === levelUpData3[i].answer ? 1 : 0),
                0
              )}
            </span>{" "}
            / {levelUpData3.length}
          </p>
          <button
            onClick={handleShowReport}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg text-white font-semibold"
          >
            View Final EQ Report →
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
