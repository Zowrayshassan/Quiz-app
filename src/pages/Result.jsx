import { Button } from "@/components/ui/button";
import { QuizContext } from "@/context/ansContext";
import { Questions } from "@/data/question";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Result() {
  const { ans } = useContext(QuizContext);
  const userName = localStorage.getItem("name");

  const correctAns = Questions.map((q) => q.answer);
  const userAns = Object.values(ans);

  let score = 0;
  let resultList = [];

  for (let i = 0; i < correctAns.length; i++) {
    if (userAns[i] === correctAns[i]) {
      score++;
      resultList.push({
        question: Questions[i].question,
        user: userAns[i],
        correct: correctAns[i],
        status: "✅ Correct",
        date: new Date().toLocaleString(),
      });
    } else {
      resultList.push({
        question: Questions[i].question,
        user: userAns[i] || "No Answer",
        correct: correctAns[i],
        status: "❌ Wrong",
        date: new Date().toLocaleString(),
      });
    }
  }

  const userQuiz = {
    name: userName,
    score: score,
    date: new Date().toLocaleString(),
  };

  const existingResults = JSON.parse(localStorage.getItem("quizResults")) || [];
  existingResults.push(userQuiz);
  localStorage.setItem("quizResults", JSON.stringify(existingResults));

  return (
    <div className="p-10 text-white text-center min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Quiz Results</h2>

      <p className="text-xl mb-10">
        Your Score:{" "}
        <span className="font-semibold text-amber-400">{score}</span> /{" "}
        {Questions.length}
      </p>

      <div className="flex flex-col items-center gap-6">
        {resultList.map((item, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl w-full max-w-xl border text-left transition-all duration-200 ${
              item.status === "✅ Correct"
                ? "border-green-400 bg-green-50/10"
                : "border-red-400 bg-red-50/10"
            }`}
          >
            <p className="font-semibold text-lg mb-2">
              {i + 1}. {item.question}
            </p>
            <p>Your Answer: {item.user}</p>
            <p>Correct Answer: {item.correct}</p>
            <p className="mt-1">{item.status}</p>
          </div>
        ))}
      </div>

      <Link to="/">
        <Button className="hover:bg-amber-400 mt-5 w-full max-w-lg">
          Home Page
        </Button>
      </Link>
    </div>
  );
}

export default Result;
