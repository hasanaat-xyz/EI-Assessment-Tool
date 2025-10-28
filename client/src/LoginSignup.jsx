import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const level1Results = location.state?.level1Results || {};

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [submitted, setSubmitted] = useState(false); // ✅ controls what shows after form submission

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, email, password } = formData;

    try {
      // ✅ Register user
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      // ✅ Login user immediately after registration
      const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { user: loggedInUser, token } = loginRes.data;
      localStorage.setItem("token", token);
      setUser(loggedInUser);

      // ✅ Save level 1 results if available
      if (level1Results && loggedInUser?._id) {
        await axios.post("http://localhost:5000/api/quiz/result", {
          userId: loggedInUser._id,
          level: 1,
          userAnswers: level1Results.userAnswers,
          timePerQuestion: level1Results.timePerQuestion,
          quizQuestions: level1Results.quizQuestions,
          score: level1Results.score,
          total: level1Results.total,
        });
      }

      // ✅ Show success screen, don’t redirect yet
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate("/level2", { state: { currentUser: user, level1Results } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#EDE9FE] to-[#DDD6FE] text-gray-900 p-6">
      {submitted && user ? (
        // ✅ Success screen
        <motion.div
          className="text-center bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-lg border border-white/50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-semibold mb-4 text-purple-700">
            🎉 Welcome, {user.name}!
          </h1>
          <p className="text-lg mb-6">
            Level 1 Completed, You scored{" "}
            <b>{level1Results.score}</b> / {level1Results.total}
          </p>
          <motion.button
            onClick={handleContinue}
            whileHover={{ scale: 1.05 }}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-md"
          >
            Continue to Level 2 →
          </motion.button>
        </motion.div>
      ) : (
        // ✅ Login/signup form
        <motion.div
          className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-md p-8 w-full max-w-md border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-700">
            Login or Sign Up to Save Your Progress ✨
          </h2>

          {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-white/50 border border-purple-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-white/50 border border-purple-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-white/50 border border-purple-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-purple-700 hover:shadow-lg transition-all duration-200"
            >
              {loading ? "Processing..." : "Continue →"}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
