import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateQuiz from "./pages/CreateQuiz";
import Landing from "./pages/Landing";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import ShowQuiz from "./pages/ShowQuiz";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
          <Route path="/createquiz" element={<CreateQuiz />} />
          <Route path="/showquiz" element={<ShowQuiz />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
