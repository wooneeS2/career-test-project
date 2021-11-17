import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import axios from "axios";

import {
  LinearProgress,
  Box,
  Grid,
  Tooltip,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  tooltipClasses,
  Button,
} from "@mui/material";

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

const Qeustion = () => {
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography
          variant="body1"
          sx={{ color: "#2D2627", fontWeight: "bold", fontSize: "1rem" }}
        >
          두개 가치 중에 자신에게 더 중요한 가치를 선택하세요.
        </Typography>
      </Box>
    </Grid>
  );
};

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#EBF3E9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: "1rem",
    border: "1px solid #EBF3E9",
  },
}));

const Answer = ({ onChange, left, right, tol1, tol2 }) => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="space-around"
      sx={{ paddingTop: "10px" }}
    >
      <FormControl component="fieldset">
        <FormLabel component="legend"></FormLabel>

        <RadioGroup
          row
          aria-label="answer"
          name="row-radio-buttons-group"
          onChange={onChange}
        >
          <HtmlTooltip title={tol1} placement="left">
            <FormControlLabel value="left" control={<Radio />} label={left} />
          </HtmlTooltip>
          <HtmlTooltip title={tol2} placement="right">
            <FormControlLabel value="right" control={<Radio />} label={right} />
          </HtmlTooltip>
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

const NextButton = styled(Button)`
  display: block;
  margin: 0 auto;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  background-color: #378b29;
  width: 200px;
  height: 50px;
  border: none;
  box-shadow: 5px 2px 2px #ededed;
`;

const ButtonText = styled(Link)`
  text-decoration: none;
  color: #fffff;
  font-size: 20px;
  font-color: #ffffff;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export function SampleQuestion() {
  const [isActive, setIsActive] = useState(false);
  const [questions, setQuestions] = useState({
    question: "",
    ans1: "",
    ans2: "",
    ans1_1: "",
    ans2_1: "",
  });
  const handleIsActive = e => {
    e.target.value !== null ? setIsActive(true) : setIsActive(false);
    console.log(e.target.value);
  };
  const url =
    "http://www.career.go.kr/inspct/openapi/test/questions?apikey=2cfc3ece4e557d4a41050b92786fdd44&q=6";

  const requstQuestion = async () => {
    console.log(url);
    const response = await axios.get(url);
    console.log(response.data);
    setQuestions(cur => {
      const newQue = { ...cur };

      newQue.question = response.data.RESULT[0].question;
      newQue.ans1 = response.data.RESULT[0].answer01;
      newQue.ans2 = response.data.RESULT[0].answer02;
      newQue.ans1_1 = response.data.RESULT[0].answer03;
      newQue.ans2_1 = response.data.RESULT[0].answer04;
      return newQue;
    });
  };
  useEffect(() => {
    requstQuestion();
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

      <Grid item>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="10"
        >
          <Typography
            variant="body1"
            align="center"
            display="inline"
            sx={{
              color: "#000000",
              fontWeight: "500",
              fontSize: "1.1rem",
              paddingBottom: "30px",
            }}
          >
            {questions.question}
            <br />
            문항에 커서를 올리면 가치의 설명을 확인 할 수 있습니다.
          </Typography>
        </Box>
        <Grid
          item
          sx={{
            height: 150,
            border: "medium dashed green",
            padding: "30px",
            margin: "10px 20% 20px ",
          }}
        >
          <Qeustion></Qeustion>

          <Answer
            onChange={handleIsActive}
            left={questions.ans1}
            right={questions.ans2}
            tol1={questions.ans1_1}
            tol2={questions.ans2_1}
          />
        </Grid>
        <Grid item>
          <ButtonText to={isActive ? "#" : "#"}>
            <NextButton
              type="submit"
              size="large"
              variant="contained"
              disabled={isActive ? false : true}
            >
              시작하기
            </NextButton>
          </ButtonText>
        </Grid>
      </Grid>
    </Grid>
  );
}
