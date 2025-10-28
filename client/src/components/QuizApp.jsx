import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import quizData from "../data/levelUpData"; // Level 1 questions

export default function Level1Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (index) => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    const newAnswers = [...userAnswers, index];
    const newTimes = [...questionTimes, timeSpent];

    if (currentQuestion + 1 === quizData.length) {
      const totalScore = newAnswers.reduce(
        (sum, ans, i) => sum + (ans === quizData[i].answer ? 1 : 0),
        0
      );

      const level1Results = {
        score: totalScore,
        total: quizData.length,
        questions: quizData.map((q, i) => ({
          questionText: q.question,
          chosenAnswer: q.options[newAnswers[i]],
          score: newAnswers[i] === q.answer ? 1 : 0,
          timeSpent: newTimes[i],
        })),
        level: 1,
        userAnswers: newAnswers,
        timePerQuestion: newTimes,
        quizQuestions: quizData.map((q) => ({
          question: q.question,
          options: q.options,
          correctIndex: q.answer,
        })),
      };

      // ✅ Show popup before navigation
      setShowPopup(true);

      // Store results temporarily in state for when user moves next
      localStorage.setItem("level1Results", JSON.stringify(level1Results));
    } else {
      setUserAnswers(newAnswers);
      setQuestionTimes(newTimes);
      setCurrentQuestion(currentQuestion + 1);
      setStartTime(Date.now());
    }
  };

  const handleNextLevel = () => {
    const storedResults = JSON.parse(localStorage.getItem("level1Results"));
    navigate("/login", { state: { level1Results: storedResults } });
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-700 to-indigo-600 text-white p-6 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6">Level 1: Self-Awareness 🧠</h2>
      <div className="bg-white/20 p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h3 className="text-lg mb-4">{quizData[currentQuestion].question}</h3>
        <div className="flex flex-col space-y-3">
          {quizData[currentQuestion].options.map((opt, i) => (
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
        Question {currentQuestion + 1} of {quizData.length}
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
            <div className="bg-white text-purple-800 rounded-2xl p-8 shadow-2xl text-center max-w-sm">
              <h3 className="text-2xl font-bold mb-4">🎉 Level 1 Completed!</h3>
              <p className="mb-6 text-gray-700">
                Great job! You’ve unlocked level-1!
              </p>
              <button
                onClick={handleNextLevel}
                className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-all"
              >
                Next Level →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
