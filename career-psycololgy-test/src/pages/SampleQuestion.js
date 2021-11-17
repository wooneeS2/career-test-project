import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SendIcon from "@mui/icons-material/Send";
import { QuestionList, MainQuestion } from "../components/Questions";
import { LinearProgress, Box, Grid, Button, Typography } from "@mui/material";
import axios from "axios";

function ProgressBar(props) {
  return (
    <Box
      display="block"
      justifyContent="center"
      alignItems="center"
      minHeight="0"
      sx={{ display: "flex", alignItems: "center", padding: "10px 0 0 10px" }}
    >
      <Box sx={{ width: "90%", mr: 3 }}>
        <LinearProgress
          variant="determinate"
          sx={{ height: "0.5rem", borderRadius: "10px" }}
          {...props}
        />
      </Box>
      <Box>
        <Typography
          variant="body1"
          sx={{ color: "#2D2627", fontWeight: "bold", fontSize: "1rem" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const NextButton = styled(Button)`
  display: flex;
  margin: 0 auto;
  border-radius: 30px;
  color: #fff;
  font-size: 1rem;

  background-color: #378b29;
  width: 200px;
  height: 50px;
  border: none;
  box-shadow: 5px 2px 2px #ededed;
`;

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
        <Typography
          variant="body1"
          sx={{ color: "#2D2627", fontWeight: "bold", fontSize: "2rem" }}
        >
          검사예시
        </Typography>
        <ProgressBar value={50} />
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
        <NextButton
          startIcon={<SendIcon />}
          type="submit"
          size="large"
          variant="contained"
          disabled={isActive ? false : true}
          href={isActive ? "/test-progress" : "#"}
        >
          시작하기
        </NextButton>
      </Grid>
    </Grid>
  );
}
export default SampleQuestion;
