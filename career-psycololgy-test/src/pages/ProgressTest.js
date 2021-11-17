import React from "react";
import { QuestionList, MainQuestion } from "../components/Questions";
import { useState, useEffect } from "react";
import axios from "axios";

export function ProgressTest() {
  const [questions, setQeustions] = useState([]);
  const url =
    "http://www.career.go.kr/inspct/openapi/test/questions?apikey=2cfc3ece4e557d4a41050b92786fdd44&q=6";
  const requestQuestion = async () => {
    const response = await axios.get(url);
    const responseLen = response.data.RESULT.length;

    setQeustions(response.data.RESULT);
    console.log(responseLen);
  };

  useEffect(() => {
    requestQuestion();
  }, []);

  const handleNext = () => {
    console.log("hey");
  };
  console.log("questions:", questions);

  const setQuestions = questions.map(q => {
    return <QuestionList questions={q} handleIsActive={handleNext} />;
  });

  return (
    <div>
      <div>
        <MainQuestion></MainQuestion>
      </div>
      {setQuestions}
    </div>
  );
}

export default ProgressTest;
