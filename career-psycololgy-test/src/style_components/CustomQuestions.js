import React, { useEffect, useState } from "react";
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
  tooltipClasses,
  easing,
} from "@mui/material";

export function MainQuestion() {
  return (
    <Grid container direction="column" alignItems="center" justify="center">
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

const NotWorking = ({
  answer01,
  answer02,
  answerScore01,
  answerScore02,
  handleRadioBtn,
}) => {
  return (
    <RadioGroup aria-label="two" name="two" row onChange={handleRadioBtn}>
      <FormControlLabel
        value={"1"}
        control={<Radio color="primary" />}
        label={1}
        labelPlacement="top"
      />
      <FormControlLabel
        value={2}
        control={<Radio />}
        label={2}
        labelPlacement="top"
      />
    </RadioGroup>
  );
};

function Answer({
  left,
  right,
  tol1,
  tol2,
  leftValue,
  rightValue,
  index,
  handleRadioBtn,
}) {
  const [value, setValue] = useState(0);
  const [answr, setAnswr] = useState([{ id: "", value: "" }]);

  const handleRadio = e => {
    const values = e.target.value;
    setValue(values);
    const oneAnswr = {
      id: index,
      value: values,
    };
    setAnswr(answr.concat(oneAnswr));

    console.log("answer::", answr);
  };
  return (
    <RadioGroup
      row
      aria-label="answer"
      name="answer-radio-btn"
      onChange={handleRadio}
      value={value}
    >
      <HtmlTooltip title={tol1} placement="left">
        <FormControlLabel
          name={"answer"}
          value={leftValue}
          control={<Radio />}
          label={left}
          labelPlacement="top"
        />
      </HtmlTooltip>
      <HtmlTooltip title={tol2} placement="right">
        <FormControlLabel
          name={"answer"}
          value={rightValue}
          control={<Radio />}
          label={right}
          labelPlacement="top"
        />
      </HtmlTooltip>
    </RadioGroup>
  );
}

export function QuestionList({ questions, index, handleRadioBtn }) {
  return (
    <Grid>
      <Grid
        item
        sx={{
          height: 150,
          border: "medium dashed green",
          padding: "30px",
          margin: "10px 20% 20px ",
        }}
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
          {`${index}.`} {questions.question}
        </Typography>

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
      </Grid>
    </Grid>
  );
}

export default QuestionList;
