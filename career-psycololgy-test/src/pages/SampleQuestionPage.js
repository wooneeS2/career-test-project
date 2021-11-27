import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  QuestionList,
  MainQuestion,
} from "../style_components/CustomQuestions";
import { Grid, Box } from "@mui/material";
import NextBtn from "../style_components/CustomButtons";
import ProgressBar from "../style_components/CustomProgressBar";
import MainTitle from "../style_components/CustomTitles";

export function SampleQuestionPage() {
  const [isActive, setIsActive] = useState(false);
  const [sampleQuestion, setSampleQuestion] = useState({
    question: "",
    answer01: "",
    answer02: "",
    answer03: "",
    answer04: "",
    answerScore01: "",
    answerScore02: "",
  });

  const handleIsActive = e => {
    e.target.value !== null ? setIsActive(true) : setIsActive(false);
  };

  useEffect(() => {
    console.log(" ");
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
      newQue.answerScore01 = setRes.answerScore01;
      newQue.answerScore02 = setRes.answerScore02;
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
    >
      <MainTitle title={"검사 예시"} />
      <Box sx={{ paddingBottom: "20px" }}>
        <ProgressBar value={0} />
      </Box>

      <Box sx={{ paddingBottom: "10px" }}>
        <MainQuestion />
      </Box>
      <QuestionList
        questions={{
          question: sampleQuestion.question,
          answer01: sampleQuestion.answer01,
          answer02: sampleQuestion.answer02,
          answer03: sampleQuestion.answer03,
          answer04: sampleQuestion.answer04,
          answerScore01: sampleQuestion.answerScore01,
          answerScore02: sampleQuestion.answerScore02,
        }}
        handleRadioBtn={handleIsActive}
        index={1}
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
export default SampleQuestionPage;
