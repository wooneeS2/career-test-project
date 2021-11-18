import React, { useState, useEffect } from "react";
import { QuestionList, MainQuestion } from "../components/Questions";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import NextBtn from "../components/CustomButtons";
import ProgressBar from "../components/ProgressBar";
import MainTitle from "../style_components/Titles";

export function SampleQuestion() {
  const [isActive, setIsActive] = useState(false);
  const [sampleQuestion, setSampleQuestion] = useState({
    question: "",
    answer01: "",
    answer02: "",
    answer03: "",
    answer04: "",
  });

  const handleIsActive = e => {
    e.target.value !== null ? setIsActive(true) : setIsActive(false);
    console.log(e.target.value);
    console.log(isActive);
  };

  useEffect(() => {
    console.log("effect isActive", isActive);
  }, [isActive]);

  const url =
    "http://www.career.go.kr/inspct/openapi/test/questions?apikey=2cfc3ece4e557d4a41050b92786fdd44&q=6";

  const connectSampleQuestion = async () => {
    const response = await axios.get(url);
    const setRes = response.data.RESULT[0];
    setSampleQuestion(current => {
      const newQue = { ...current };
      newQue.question = setRes.question;
      newQue.answer01 = setRes.answer01;
      newQue.answer02 = setRes.answer02;
      newQue.answer03 = setRes.answer03;
      newQue.answer04 = setRes.answer04;
      return newQue;
    });
  };

  useEffect(() => {
    connectSampleQuestion();
  }, []);

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      display="inline"
      spacing={3}
    >
      <Grid item>
        <MainTitle title={"검사 예시"} />
        <ProgressBar value={0} />
      </Grid>
      <MainQuestion></MainQuestion>
      <QuestionList
        questions={{
          question: sampleQuestion.question,
          answer01: sampleQuestion.answer01,
          answer02: sampleQuestion.answer02,
          answer03: sampleQuestion.answer03,
          answer04: sampleQuestion.answer04,
        }}
        handleIsActive={handleIsActive}
      ></QuestionList>
      <Grid item>
        <NextBtn
          toPath={isActive ? "/test-progress" : "#"}
          title={"시작하기"}
          isActive={isActive ? false : true}
        />
      </Grid>
    </Grid>
  );
}
export default SampleQuestion;
