import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import {
  ToggleButtonGroup,
  Box,
  ToggleButton,
  TextField,
  Button,
} from "@mui/material";

const MainTitle = styled.p`
  color: black;
  font-size: 40px;
  width: 300px;
  margin: 0 auto;
  display: block;
  font-weight: bold;
  padding-bottom: 20px;
`;

const NameInput = styled(TextField)`
  //   display: block;
  //   border: none;
  //   outline: none;
  //   background: none;
  //   //   width: 300px;
  //   //   margin: 0 auto;
  //   color: black;
  //   padding: 20px 0 20px 0;
`;

const NextButton = styled(Button)`
  display: block;
  margin: 0 auto;
  border-radius: 30px;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
  background-color: #eac086;
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

export function StartPage() {
  const [gender, setGender] = useState("");
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState(false);

  const handleInputChange = e => {
    e.preventDefault();
    console.log(name, gender);
    console.log(isActive);
  };
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
      >
        <MainTitle>직업 가치관 검사</MainTitle>
      </Box>
      <form>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="0"
        >
          <NameInput
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
          <ButtonText to={isActive ? "/sample-question" : "#"}>
            <NextButton
              type="submit"
              size="large"
              variant="contained"
              disabled={isActive ? false : true}
              onSubmit={handleInputChange}
            >
              시작하기
            </NextButton>
          </ButtonText>
        </Box>
      </form>
    </div>
  );
}
