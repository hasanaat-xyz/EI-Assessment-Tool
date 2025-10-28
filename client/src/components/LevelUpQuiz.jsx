import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import levelUpData from "../data/levelUpData"; // Level 2 questions

export default function Level2Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, level1Results } = location.state || {};
  if (!currentUser) navigate("/login");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [showPopup, setShowPopup] = useState(false);

  const handleSelect = async (index) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const newAnswers = [...userAnswers, index];
    const newTimes = [...questionTimes, timeSpent];

    if (currentQuestion + 1 === levelUpData.length) {
      const totalScore = newAnswers.reduce(
        (sum, ans, i) => sum + (ans === levelUpData[i].answer ? 1 : 0),
        0
      );

      try {
        await axios.post("http://localhost:5000/api/quiz/result", {
          userId: currentUser._id,
          level: 2,
          userAnswers: newAnswers,
          timePerQuestion: newTimes,
          quizQuestions: levelUpData.map((q) => ({
            question: q.question,
            options: q.options,
            correctIndex: q.answer,
          })),
          score: totalScore,
          total: levelUpData.length,
        });

        // ✅ Show popup
        setShowPopup(true);

        // Store result temporarily
        localStorage.setItem(
          "level2Results",
          JSON.stringify({
            score: totalScore,
            total: levelUpData.length,
            questions: levelUpData.map((q, i) => ({
              questionText: q.question,
              chosenAnswer: q.options[newAnswers[i]],
              score: newAnswers[i] === q.answer ? 1 : 0,
              timeSpent: newTimes[i],
            })),
          })
        );
      } catch (err) {
        console.error("Error saving Level 2 result:", err);
      }
    } else {
      setUserAnswers(newAnswers);
      setQuestionTimes(newTimes);
      setCurrentQuestion(currentQuestion + 1);
      setStartTime(Date.now());
    }
  };

  const handleNext = () => {
    const level2Results = JSON.parse(localStorage.getItem("level2Results"));
    navigate("/level3", { state: { currentUser, level1Results, level2Results } });
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-600 to-purple-700 text-white p-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">Level 2: Self-Regulation 🌿</h2>
      <div className="bg-white/20 p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h3 className="text-lg mb-4">{levelUpData[currentQuestion].question}</h3>
        <div className="flex flex-col space-y-3">
          {levelUpData[currentQuestion].options.map((opt, i) => (
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
        Question {currentQuestion + 1} of {levelUpData.length}
      </p>

      {/* ✅ Completion Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md"
          >
            <div className="bg-white text-pink-700 rounded-2xl p-8 shadow-2xl text-center max-w-sm">
              <h3 className="text-2xl font-bold mb-4">
                🌟 Level 2 Completed!
              </h3>
              <p className="mb-6 text-gray-700">
                Awesome work! Ready to level up your EQ?
              </p>
              <button
                onClick={handleNext}
                className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-all"
              >
                Level Up Your EQ →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
