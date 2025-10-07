import { useState } from "react";
import { QuizContext } from "./ansContext";
export const ResultProvider = ({ children }) => {
  const [ans, setAns] = useState({});

  const updateAnswer = (ques, value) => {
    setAns((prev) => ({
      ...prev,
      [ques]: value,
    }));
  };
  console.log("Context data:", updateAnswer);

  return (
    <QuizContext.Provider value={{ ans, setAns }}>
      {children}
    </QuizContext.Provider>
  );
};
