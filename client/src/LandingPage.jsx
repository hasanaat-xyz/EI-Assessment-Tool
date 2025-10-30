// src/pages/LandingPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Gamepad2, Smile, Heart, Lightbulb } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  // ✨ Animation Variants
  const slideFromLeft = {
    hidden: { opacity: 0, x: -80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 80 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  // 💬 WhyCard Component
  function WhyCard({ item, i }) {
    const [open, setOpen] = useState(false);
    return (
      <motion.div
        variants={slideFromLeft}
        whileHover={{ scale: 1.05 }}
        className="bg-[#2b1b3a] p-6 rounded-2xl w-60 shadow-md hover:shadow-lg cursor-pointer relative"
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
            className="absolute inset-0 bg-[#3c1f55]/95 backdrop-blur-md rounded-2xl flex flex-col justify-center items-center p-5 text-sm text-gray-100"
          >
            <p className="mb-4 leading-relaxed">{item.text}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="mt-2 text-xs px-4 py-1 bg-[#6b4b9e] rounded-full"
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
    <div className="min-h-screen bg-[#1b0e2e] text-white overflow-hidden font-poppins">
      {/* 🏁 Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center h-screen relative px-6 md:px-16 text-center md:text-left gap-10 overflow-hidden">
        {/* 🧠 Left Text Section */}
        <motion.div
          className="md:w-1/2 flex flex-col items-center md:items-start"
          variants={slideFromLeft}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your <span className="text-[#f9b700]">Emotional Intelligence</span>:)
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover how well you understand emotions in yourself and others through an interactive, gamified experience.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/level1")}
            className="px-8 py-3 text-lg font-semibold bg-[#f9b700] text-[#1b0e2e] rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            Wanna Get Started?
          </motion.button>
        </motion.div>

        {/* 🎨 Right Image Section */}
        <motion.div
          className="md:w-1/2 flex justify-center mt-10 md:mt-0"
          variants={slideFromRight}
          initial="hidden"
          animate="visible"
        >
          <img
            src="/images/hero-ei.png"
            alt="Emotional Intelligence Illustration"
            className="w-[300px] md:w-[450px] rounded-2xl shadow-2xl"
          />
        </motion.div>
      </section>

      {/* 💜 Info Boxes */}
<section className="py-20 bg-transparent overflow-hidden">
  <motion.div
    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12 px-6"
    initial="hidden"
    whileInView="visible"
    variants={{
      hidden: {},
      visible: {
        transition: { staggerChildren: 0.25 },
      },
    }}
    viewport={{ once: true }}
  >
    {[
      {
        icon: <Heart className="text-pink-400 flex-shrink-0" size={60} strokeWidth={1.2} />,
        title: "What is Emotional Intelligence?",
        text: "Emotional intelligence is the ability to understand and manage your emotions, while recognizing others’ emotions to communicate effectively.",
      },
      {
        icon: <Brain className="text-yellow-400 flex-shrink-0" size={60} strokeWidth={1.2} />,
        title: "EQ vs IQ",
        text: "IQ measures cognitive intelligence. EQ measures how well you understand and manage emotions. High EQ often leads to better real-life outcomes.",
      },
      {
        icon: <Lightbulb className="text-green-400 flex-shrink-0" size={60} strokeWidth={1.2} />,
        title: "Did You Know?",
        text: "Studies show that 90% of top performers have high EQ rather than high IQ. The good news: Emotional intelligence can be trained and improved over time.",
      },
    ].map((box, i) => (
      <motion.div
        key={i}
        variants={slideFromLeft}
        className="p-6 rounded-2xl shadow-md hover:shadow-lg transition-all bg-[#2b1b3a]"
      >
        <div className="flex items-start space-x-5">
          {box.icon}
          <div>
            <h3 className="text-xl font-semibold mb-2 text-purple-200">{box.title}</h3>
            <p className="text-sm text-gray-200 leading-relaxed">{box.text}</p>
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
</section>


      {/* 💡 Why EI Matters */}
      <section className="py-24 bg-transparent text-center overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-10"
        >
          Why Emotional Intelligence <span className="text-[#f9b700]">Matters</span>
        </motion.h2>

        {/* 🌀 Animated EI Diagram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center mb-14"
        >
          <img
            src="/images/ei-diagram.png"
            alt="Emotional Intelligence Diagram"
            className="w-full max-w-2xl rounded-2xl shadow-lg border border-[#3c1f55]"
          />
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-10 px-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: "💞",
              title: "Build better relationships",
              text: "When you understand and manage emotions well, you communicate better and connect deeply with others, building trust and respect naturally.",
            },
            {
              icon: "🚀",
              title: "Boost your career success",
              text: "People with strong emotional intelligence handle stress, teamwork, and feedback well — qualities every leader and manager values.",
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
            <WhyCard key={i} item={item} i={i} />
          ))}
        </motion.div>
      </section>

      {/* ⚙️ How It Works */}
      <section className="py-24 bg-transparent text-center relative overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold mb-16 text-white"
        >
          How It <span className="text-[#f9b700]">Works</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: <Gamepad2 size={50} />,
              title: "Play Interactive Scenarios",
              desc: "Face real-life emotional situations and make decisions that reflect how you feel.",
              color: "#6b4b9e",
            },
            {
              icon: <Brain size={50} />,
              title: "Understand Emotions",
              desc: "Each choice helps you uncover your awareness, empathy, and emotional balance.",
              color: "#f9b700",
            },
            {
              icon: <Smile size={50} />,
              title: "Get Your EQ Score",
              desc: "Receive a personalized EQ report that helps you improve emotional skills.",
              color: "#ff6b6b",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={slideFromLeft}
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="relative group p-[2px] rounded-3xl shadow-lg hover:shadow-2xl transition-all"
              style={{ backgroundColor: item.color }}
            >
              <div className="bg-[#2b1b3a] rounded-3xl h-full p-8 flex flex-col justify-between text-white group-hover:bg-opacity-80 transition-all duration-500 relative z-10">
                <motion.div className="flex justify-center mb-6 text-white group-hover:opacity-0 transition-all duration-300">
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-[#f9b700] transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-300 group-hover:opacity-90 transition-all duration-500">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-transparent text-center text-gray-400 text-sm">
        Made with ❤️ by <span className="text-white font-semibold">Amtul Noor Hasanaat</span> | 2025
      </footer>
    </div>
  );
}
