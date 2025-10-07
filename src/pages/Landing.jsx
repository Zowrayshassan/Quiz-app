import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    if (!name) {
      alert("Please enter your name");
      return;
    }

    localStorage.setItem("name", name);
    navigate("/Quiz");
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-4xl font-bold mb-10">Quiz App </h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="bg-gray-800  text-white p-2 rounded-md mx-3 flex mb-5 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <div>
        <Button size="lg" onClick={handleStart} className="hover:bg-amber-400">
          Start Quiz
        </Button>

        {/* <Link to="/CreateQuiz">
          <Button size="lg" className="hover:bg-amber-400 mx-3">
            Create Quiz
          </Button>
        </Link>
        <Link to="/showquiz">
          <Button size="lg" className="hover:bg-amber-400 mx-3">
            Show Quiz
          </Button>
        </Link> */}
      </div>
    </div>
  );
}
