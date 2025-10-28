import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizApp from "./components/QuizApp"; // Level 1
import LoginSignup from "./LoginSignup";
import LevelUpQuiz from "./components/LevelUpQuiz"; // Level 2
import LevelUpQuiz3 from "./components/LevelUpQuiz3"; // Level 3
import LandingPage from "./LandingPage";
import EQReport from "./components/EQReport"; // adjust the path if needed

// level2 and level3 data !
import levelUpData from "./data/levelUpData";
import levelUpData3 from "./data/levelUpData3";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLoginSignup = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };
  
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={<LoginSignup onSubmit={handleLoginSignup} />}
          />
          <Route
            path="/level1"
            element={<QuizApp currentUser={user} level={1} />}
          />
          <Route
            path="/level2"
            element={
              <LevelUpQuiz
                quizData={levelUpData}
                currentUser={user}
                level={2}
              />
            }
          />
          <Route
            path="/level3"
            element={
              <LevelUpQuiz3
                quizData={levelUpData3}
                currentUser={user}
                level={3}
              />
            }
          />
          <Route path="/eq-report" element={<EQReport />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}
export default App;
