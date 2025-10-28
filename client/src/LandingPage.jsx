// src/pages/LandingPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Gamepad2, Smile, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  // WhyCard Component
  function WhyCard({ item }) {
    const [open, setOpen] = useState(false);
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-[#3b0a45]/80 p-6 rounded-2xl w-60 shadow-md hover:shadow-lg cursor-pointer relative"
        onClick={() => setOpen(!open)}
      >
        <div className="text-4xl mb-3">{item.icon}</div>
        <p className="text-gray-200 font-semibold">{item.title}</p>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-[#4b0f63]/95 backdrop-blur-md rounded-2xl flex flex-col justify-center items-center p-5 text-sm text-gray-100"
          >
            <p className="mb-4 leading-relaxed">{item.text}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mt-2 text-xs px-4 py-1 bg-purple-500 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Got it!
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#3b0a45] via-[#5a189a] to-[#240046] text-white overflow-hidden font-poppins">

      <section className="flex flex-col items-center justify-center text-center h-screen relative">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Test Your <span className="text-purple-300">Emotional Intelligence</span> 🎮
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl"
        >
          Discover how well you understand emotions in yourself and others through
          an interactive, gamified experience.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/level1")}
          className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          Wanna Get Started ?
        </motion.button>

        {/* Floating Emojis */}
        <motion.div
          className="absolute top-20 left-10 text-5xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          😄
        </motion.div>

        <motion.div
          className="absolute bottom-24 right-10 text-5xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          😡
        </motion.div>

        <motion.div
          className="absolute top-40 right-[8%] text-5xl"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2.8 }}
        >
          😢
        </motion.div>

        <motion.div
          className="absolute top-32 left-1/3 text-5xl"
          animate={{ y: [0, 25, 0] }}
          transition={{ repeat: Infinity, duration: 3.5 }}
        >
          😎
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-1/4 text-5xl"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 3.2 }}
        >
          🫡
        </motion.div>

        <motion.div
          className="absolute top-16 right-1/3 text-5xl"
          animate={{ y: [0, 18, 0] }}
          transition={{ repeat: Infinity, duration: 2.6 }}
        >
          😒
        </motion.div>
      </section>

      {/* 🔄 Why EI Matters (interactive version) */}
      <section className="py-24 bg-transparent text-center">
        <h2 className="text-4xl font-bold mb-10">
          Why Emotional Intelligence <span className="text-purple-300">Matters</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-10 px-10">
          {[
            {
              icon: "💞",
              title: "Build better relationships",
              text: "When you understand and manage emotions well, you communicate better and connect deeply with others, building trust and respect naturally.",
            },
            {
              icon: "🚀",
              title: "Boost your career success",
              text: "People with strong emotional intelligence handle stress, teamwork, and feedback well,  qualities every leader and manager values.",
            },
            {
              icon: "🌿",
              title: "Improve mental wellness",
              text: "Understanding your emotions helps you calm your mind, avoid burnout, and stay balanced, making life feel lighter and more manageable.",
            },
            {
              icon: "🧠",
              title: "Make smarter decisions",
              text: "When emotions don’t cloud your judgment, you can think clearly, evaluate better, and choose what’s truly right for you.",
            },
          ].map((item, i) => (
            <WhyCard key={i} item={item} />
          ))}
        </div>
      </section>

      {/* 🔄 How It Works (same as before) */}
      <section className="py-24 bg-transparent text-center relative overflow-hidden">
        <h2 className="text-4xl font-bold mb-16 text-white">
          How It <span className="text-purple-300">Works</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20">
          {[
            {
              icon: <Gamepad2 size={50} />,
              title: "Play Interactive Scenarios",
              desc: "Face real-life emotional situations and make decisions that reflect how you feel.",
              gradient: "from-pink-500 via-purple-500 to-indigo-500",
            },
            {
              icon: <Brain size={50} />,
              title: "Understand Emotions",
              desc: "Each choice helps you uncover your awareness, empathy, and emotional balance.",
              gradient: "from-blue-500 via-purple-500 to-pink-500",
            },
            {
              icon: <Smile size={50} />,
              title: "Get Your EQ Score",
              desc: "Receive a personalized EQ report that helps you improve emotional skills.",
              gradient: "from-purple-500 via-pink-500 to-yellow-400",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: "spring", stiffness: 120 }}
              className={`relative group bg-gradient-to-br ${item.gradient} p-[2px] rounded-3xl shadow-lg hover:shadow-2xl transition-all`}
            >
              <div className="bg-[#2a0a45]/90 rounded-3xl h-full p-8 flex flex-col justify-between text-white group-hover:bg-opacity-80 transition-all duration-500 relative z-10">
                <motion.div
                  className="flex justify-center mb-6 text-purple-300 group-hover:opacity-0 transition-all duration-300"
                >
                  {item.icon}
                </motion.div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-pink-200 transition-all duration-300">
                  {item.title}
                </h3>

                <p className="text-gray-300 group-hover:opacity-90 transition-all duration-500">
                  {item.desc}
                </p>

                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 text-yellow-300"
                  animate={{ rotate: [0, 180, 360] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <Sparkles size={20} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-transparent text-center text-gray-400 text-sm">
        Made with ❤️ by <span className="text-white font-semibold">Amtul Noor Hasanaat</span> | 2025
      </footer>
    </div>
  );
}
