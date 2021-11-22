import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Typography from "@mui/material/Typography";
import {
  Box,
  Grid,
  Tooltip,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  tooltipClasses,
} from "@mui/material";

export function MainQuestion() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      sx={{ marginTop: "10px" }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography
          variant="body1"
          sx={{ color: "#2D2627", fontWeight: "bold", fontSize: "1rem" }}
        >
          두개 가치 중에 자신에게 더 중요한 가치를 선택하세요.
          <br />
          보기에 커서를 올리면 가치의 설명을 확인 할 수 있습니다.
        </Typography>
      </Box>
    </Grid>
  );
}

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

function Answer({
  left,
  right,
  tol1,
  tol2,
  leftValue,
  rightValue,
  index,
  answers,
}) {
  const [value, setValue] = useState(0);

  const [answr, setAnswr] = useState({ id: "", value: "" });
  const [newAnswr, setNewAnswr] = useState([]);

  const handleRadio = e => {
    const values = e.target.value;
    setValue(values);
    const oneAnswr = {
      id: index,
      value: values,
    };
    setAnswr("one::", oneAnswr);

    setNewAnswr([...newAnswr, oneAnswr]);
  };
  useEffect(() => {
    console.log(newAnswr);
  }, [value]);
  return (
    <>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="answer"
          name="answer-radio-btn"
          onChange={handleRadio}
          value={value}
        >
          <HtmlTooltip title={tol1} placement="left">
            <FormControlLabel
              value={leftValue}
              control={<Radio />}
              label={left}
              labelPlacement="top"
            />
          </HtmlTooltip>
          <HtmlTooltip title={tol2} placement="right">
            <FormControlLabel
              value={rightValue}
              control={<Radio />}
              label={right}
              labelPlacement="top"
            />
          </HtmlTooltip>
        </RadioGroup>
      </FormControl>
    </>
  );
}

export function QuestionList({
  questions,
  handleRadioBtn,
  index,
  leftBtn,
  rightBtn,
}) {
  return (
    <Grid sx={{ marginBottom: "40px", marginTop: "20px" }}>
      <Grid
        item
        sx={{
          border: "medium dashed green",
          padding: "30px",
          margin: "10px 20% 10px ",
          backgroundColor: "secondary.sub",
        }}
      >
        <Box display="flex" justifyContent="center">
          <Typography
            variant="body1"
            align="center"
            display="inline"
            sx={{
              color: "#000000",
              fontWeight: "500",
              fontSize: "1.1rem",
            }}
          >
            {`${index}.`} {questions.question}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" sx={{ paddingTop: "10px" }}>
          <Answer
            handleRadioBtn={handleRadioBtn}
            left={questions.answer01}
            right={questions.answer02}
            tol1={questions.answer03}
            tol2={questions.answer04}
            leftValue={questions.answerScore01}
            rightValue={questions.answerScore02}
            index={index}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default QuestionList;
