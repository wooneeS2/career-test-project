import React, { useState, useEffect } from "react";
import {
  ToggleButtonGroup,
  Box,
  ToggleButton,
  TextField,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
} from "@mui/material";
import NextBtn from "../style_components/CustomButtons";
import MainTitle from "../style_components/CustomTitles";

//TODO 이름, 성별 선택하지 않고 시작하기 눌렀을 때 안내 메시지 출력

export function StartPage() {
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [grade, setGrade] = useState("");
  const [targetSe, setTargetSe] = useState("");
  const [belong, setBelong] = useState("");

  const handleInputName = e => {
    setName(e.target.value);
    gender !== "" && name !== "" && grade !== "" && targetSe !== ""
      ? setIsActive(true)
      : setIsActive(false);
  };
  const handleInputBelong = e => {
    let value = e.target.value;
    value === null || value === "" || value === " "
      ? setBelong("-")
      : setBelong(e.target.value);
  };
  const handleInputGender = event => {
    setGender(event.target.value);

    gender !== "" && name !== "" && grade !== "" && targetSe !== ""
      ? setIsActive(true)
      : setIsActive(false);
  };

  const handleInputGrade = event => {
    setGrade(event.target.value);
    gender !== "" && name !== "" && grade !== "" && targetSe !== ""
      ? setIsActive(true)
      : setIsActive(false);
  };
  const handleInputTarget = event => {
    setTargetSe(event.target.value);
    gender !== "" && name !== "" && grade !== "" && targetSe !== ""
      ? setIsActive(true)
      : setIsActive(false);
  };

  useEffect(() => {
    console.log("effect");
  }, [gender]);
  useEffect(() => {
    gender !== "" && name !== "" ? setIsActive(true) : setIsActive(false);
    console.log("name", name, "gender ", gender);
    sessionStorage.setItem("userGender", gender);
    sessionStorage.setItem("userName", name);
    sessionStorage.setItem("userTarget", targetSe);
    sessionStorage.setItem("userGrade", grade);
    sessionStorage.setItem("userBelong", belong);
  }, [gender, name, grade, targetSe]);

  return (
    <div>
      <Box
        display="block"
        justifyContent="center"
        alignItems="center"
        minHeight="0"
        sx={{
          color: "black",
          fontSize: "40px",
          width: "300px",
          margin: "0 auto",
          display: "block",
          fontWeight: "bold",
          paddingBottom: "20px",
        }}
      >
        <MainTitle title={"직업 가치관 검사"}></MainTitle>
      </Box>
      <form>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="0"
        >
          <TextField
            type="text"
            name="name"
            label="이름"
            onChange={handleInputName}
            variant="standard"
            placeholder="이름을 입력해주세요."
          />
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100px"
        >
          <ToggleButtonGroup
            color="primary"
            value={gender}
            exclusive
            onChange={handleInputGender}
          >
            <ToggleButton value="100324">여자</ToggleButton>
            <ToggleButton value="100323">남자</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">학년</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={grade}
            label="grade"
            onChange={handleInputGrade}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={0}>해당사항 없음</MenuItem>
            <MenuItem value={1}>1학년</MenuItem>
            <MenuItem value={2}>2학년</MenuItem>
            <MenuItem value={3}>3학년</MenuItem>
            <MenuItem value={4}>4학년</MenuItem>
            <MenuItem value={5}>5학년</MenuItem>
          </Select>
          <FormHelperText>(필수)학년을 선택해주세요.</FormHelperText>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">
            검사자 타입
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={targetSe}
            label="grade"
            onChange={handleInputTarget}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value={100208}>대학생</MenuItem>
            <MenuItem value={100209}>일반</MenuItem>
            <MenuItem value={100210}>일반(학부모)</MenuItem>
            <MenuItem value={100214}>교사</MenuItem>
            <MenuItem value={100215}>교사(상담)</MenuItem>
          </Select>
          <FormHelperText>(필수)검사자 타입을 선택해주세요.</FormHelperText>
        </FormControl>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="0"
        >
          <TextField
            type="text"
            name="belong"
            label="소속"
            onChange={handleInputBelong}
            variant="standard"
            placeholder="소속을 입력해주세요.(선택)"
          />
        </Box>

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100px"
        >
          <Box textAlign="center" sx={{ justifyContent: "center" }}>
            <NextBtn
              toPath={isActive ? "/sample-question" : "#"}
              title={"시작하기"}
              isActive={isActive ? false : true}
              onChange={e => {
                e.preventDefault();
              }}
            />
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default StartPage;
