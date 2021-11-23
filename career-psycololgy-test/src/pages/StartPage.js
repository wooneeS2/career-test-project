import React, { useState, useEffect } from "react";
import { ToggleButtonGroup, Box, ToggleButton, TextField } from "@mui/material";
import NextBtn from "../style_components/CustomButtons";
import MainTitle from "../style_components/CustomTitles";

//TODO 이름, 성별 선택하지 않고 시작하기 눌렀을 때 안내 메시지 출력
//TODO 학년도 받아오기
//TODO 이름,성별,학년 react-hook-form 사용해서 받아오기
export function StartPage() {
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);

  // const handleInputChange = e => {
  //   e.preventDefault();
  //   console.log(name, gender);
  //   console.log(isActive);
  // };
  const handleInputName = e => {
    setName(e.target.value);
    gender !== "" && name !== "" ? setIsActive(true) : setIsActive(false);
    console.log(name, gender);
    console.log(isActive);
  };
  const handleInputGender = event => {
    setGender(event.target.value);
    gender !== "" && name !== "" ? setIsActive(true) : setIsActive(false);
    console.log(name, gender);
    console.log(isActive);
  };
  useEffect(() => {
    console.log("effect gender", gender);
  }, [gender]);
  useEffect(() => {
    gender !== "" && name !== "" ? setIsActive(true) : setIsActive(false);
  }, [gender, name]);

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
            <ToggleButton value="female">여자</ToggleButton>
            <ToggleButton value="male">남자</ToggleButton>
          </ToggleButtonGroup>
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
            />
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default StartPage;
