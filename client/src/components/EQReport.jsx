import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function EQReport() {
  const location = useLocation();
  let results = location.state;

  if (!results) results = [];
  else if (!Array.isArray(results) && typeof results === "object") {
    // Convert object level1, level2, level3 to array
    results = Object.keys(results).map(key => ({
      level: key.replace("level", ""), // "1", "2", "3"
      ...results[key]
    }));
  }

  const [aiReport, setAiReport] = useState("");
  const [loading, setLoading] = useState(false);

  if (!results || results.length === 0) {
    return <p className="p-6 text-red-500">No results found. Please complete the quiz first.</p>;
  }

  const totalScore = results.reduce((sum, level) => sum + (level.score || 0), 0);
  const maxScore = results.reduce((sum, level) => sum + (level.total || 0), 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  let rating = "";
  let ratingColor = "";
  if (percentage >= 80) {
    rating = "High EQ 🌟";
    ratingColor = "bg-green-100 text-green-800";
  } else if (percentage >= 50) {
    rating = "Moderate EQ 🙂";
    ratingColor = "bg-yellow-100 text-yellow-800";
  } else {
    rating = "Low EQ 😔";
    ratingColor = "bg-red-100 text-red-800";
  }

  useEffect(() => {
    const generateAIReport = async () => {
      setLoading(true);
      try {
        const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const allLevelsText = results.map(level => {
          return `Level ${level.level}:\n` +
            (level.questions || []).map(q =>
              `Q: ${q.questionText}\nAnswer: ${q.chosenAnswer}\nScore: ${q.score}\nTime Spent: ${q.timeSpent}s`
            ).join("\n\n");
        }).join("\n\n");

        const prompt = `
You are an expert emotional intelligence coach.
Generate a concise, motivational, and personalized EQ report for the user based on their quiz performance.

User Answers:
${allLevelsText}

Total Scores:
- Total Score: ${totalScore} / ${maxScore}
- Overall Percentage: ${percentage}%
- Rating: ${rating}

Please include:
1. Summary of user's emotional intelligence
2. Strengths observed
3. Areas for improvement
4. 3 personalized tips

Keep it friendly, insightful, and under 250 words.
`;

        const result = await model.generateContent(prompt);
        let text = result.response.text() || "⚠️ No insights generated at this time.";
        text = text.replace(/\*\*/g, "").replace(/^-+\s*/gm, "").replace(/\n{2,}/g, "\n").trim();

        setAiReport(text);
      } catch (err) {
        console.error("Error generating AI report:", err);
        setAiReport("⚠️ Unable to generate AI report at the moment.");
      } finally {
        setLoading(false);
      }
    };

    generateAIReport();
  }, [results, totalScore, maxScore, percentage, rating]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">🎯 Your EQ Report</h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mb-6">
        <p className="text-xl mb-2 text-gray-700">
          Total Score: <span className="font-bold">{totalScore}</span> / {maxScore}
        </p>
        <p className="text-xl mb-2 text-gray-700">Percentage: {percentage}%</p>
        <p className={`text-2xl font-semibold mb-4 inline-block px-3 py-1 rounded-full ${ratingColor}`}>
          {rating}
        </p>

        {results.map((level, idx) => (
          <div key={idx} className="mb-4">
            <h2 className="font-bold text-lg mb-1 text-gray-800">Level {level.level}</h2>
            <p className="text-gray-700 mb-1">
              Score: {level.score} / {level.total}
            </p>
            <div className="w-full bg-gray-300 rounded-full h-4 mt-1">
              <div
                className="h-4 rounded-full"
                style={{
                  width: `${Math.round((level.score / level.total) * 100)}%`,
                  backgroundColor: ["#A3BFFA","#FBC5A3","#C6F6D5"][idx % 3],
                  transition: "width 0.5s ease-in-out",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-2xl mb-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2 flex items-center gap-2">
          🤖 AI Emotional Analysis
        </h2>
        {loading ? (
          <p className="animate-pulse text-gray-500">Generating your personalized EQ insights...</p>
        ) : (
          <div className="space-y-4 text-gray-700">
            {aiReport.split("\n").map((line, idx) => {
              if (/tip/i.test(line)) return (
                <p key={idx} className="bg-purple-50 border-l-4 border-purple-400 pl-4 py-2 rounded-lg text-purple-800 font-medium">
                  💡 {line}
                </p>
              );
              if (/summary/i.test(line)) return (
                <p key={idx} className="bg-green-50 pl-4 py-1 rounded-lg text-green-800 font-semibold">
                  📄 {line}
                </p>
              );
              if (/strength/i.test(line)) return (
                <p key={idx} className="bg-blue-50 pl-4 py-1 rounded-lg text-blue-800 font-semibold">
                  ⭐ {line}
                </p>
              );
              if (/area/i.test(line)) return (
                <p key={idx} className="bg-red-50 pl-4 py-1 rounded-lg text-red-800 font-semibold">
                  ⚠️ {line}
                </p>
              );
              return <p key={idx} className="text-gray-700 leading-relaxed">{line}</p>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
