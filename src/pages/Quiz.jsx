import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/ansContext";
import { Questions } from "../data/question";

const Quiz = () => {
  const [quizQuestion, setQuizQuestion] = useState(0);
  const [selectAnswers, setSelectAnswers] = useState({});
  const { ans, setAns } = useContext(QuizContext);
  const navigate = useNavigate();
  const ques = Questions[quizQuestion].question;
  const opt = Questions[quizQuestion].options;

  const onChangeAnswers = (value) => {
    const updated = { ...selectAnswers, [ques]: value };
    setSelectAnswers(updated);
    setAns(updated);
  };

  const handleNext = () => setQuizQuestion(quizQuestion + 1);
  const handlePrev = () =>
    quizQuestion === 0
      ? alert("First question!")
      : setQuizQuestion(quizQuestion - 1);

  const handleSubmit = () => {
    const unanswered = Questions.filter((q) => !(q.question in ans));
    if (unanswered.length > 0) {
      alert(`You still have ${unanswered.length} unanswered question(s).`);
    } else {
      navigate("/result");
    }
  };

  const unattempted = Questions.filter((q) => !(q.question in ans));

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen text-white px-4 gap-6">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl mt-5 shadow-xl border border-gray-700 p-8">
        <div className="flex gap-3 mb-8">
          <p className="text-3xl font-bold text-amber-400">
            {quizQuestion + 1}.
          </p>
          <p className="text-xl font-semibold">{ques}</p>
        </div>

        <RadioGroup
          value={selectAnswers[ques] || ""}
          onValueChange={onChangeAnswers}
          className="space-y-4"
        >
          {opt.map((q, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-700 border border-gray-600 hover:border-amber-400 cursor-pointer p-3 rounded-xl"
            >
              <RadioGroupItem
                value={q}
                id={`opt-${i}`}
                className="text-amber-400 border-gray-500"
              />
              <Label
                htmlFor={`opt-${i}`}
                className="text-base font-medium cursor-pointer"
              >
                {q}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-between mt-10">
          <Button
            onClick={handlePrev}
            className="flex items-center gap-2 bg-gray-700 hover:bg-amber-500 text-white px-6 py-2 rounded-xl"
          >
            <ArrowBigLeft className="w-5 h-5" /> Prev
          </Button>

          {quizQuestion === Questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl"
            >
              Submit
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-xl"
            >
              Next <ArrowBigRight className="w-5 h-5" />
            </Button>
          )}
        </div>

        <div className="mt-8 text-sm text-gray-400 text-center">
          Question {quizQuestion + 1} of {Questions.length}
        </div>
      </div>


      <div className="bg-gray-800 border border-gray-700 rounded-2xl mt-5 p-4">
        <h3 className="text-lg font-semibold mb-3 text-amber-400 text-center">
          Unattempted
        </h3>

        <div className="flex flex-wrap justify-center gap-2 w-[190px]">
          {unattempted.map((q, i) => {
            const questionIndex = Questions.indexOf(q);
            return (
              <button
                key={i}
                onClick={() => setQuizQuestion(questionIndex)}
                className="w-10 h-10 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full"
              >
                {questionIndex + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
