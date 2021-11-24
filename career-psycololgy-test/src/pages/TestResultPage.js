import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ReplayIcon from "@mui/icons-material/Replay";

export function TestResultPage() {
  return (
    <>
      <p>검사결과</p>
      <LoadLocation />
    </>
  );
}

function LoadLocation() {
  let location = useLocation();
  const url =
    "http://www.career.go.kr/inspct/openapi/test/report?apikey=2cfc3ece4e557d4a41050b92786fdd44&qestrnSeq=6";
  const api = "2cfc3ece4e557d4a41050b92786fdd44";
  const qestrnSeq = "6";
  let answers = location.state.answer;
  let resultUrl = "";
  console.log("answers:", answers);

  const request_post = async () => {
    //TODO 여기 데이터들 변수로 바꿔주기
    //TODO 이름, 나이 ,학년 받아오기
    const response = await axios.post(url, {
      apikey: api,
      qestrnSeq: qestrnSeq,
      trgetSe: "100214 ",
      name: "gil-dong",
      gender: "100323",
      school: "hello",
      grade: "1",
      email: "",
      startDtm: 1550466291034,
      // answers: answers,
      answers:
        "B1=1 B2=4 B3=5 B4=8 B5=9 B6=11 B7=14 B8=15 B9=17 B10=20 B11=21 B12=23 B13=26 B14=28 B15=29 B16=31 B17=33 B18=36 B19=37 B20=39 B21=41 B22=44 B23=45 B24=48 B25=49 B26=51 B27=53 B28=56",
    });
    console.log(response.data);
    resultUrl = response.data.RESULT.url;
    console.log(resultUrl);
  };

  useEffect(() => {
    request_post();
  }, []);

  useEffect(() => {
    console.log("correct::", location);
  }, [location]);

  let history = useHistory();

  const onClick = () => {
    history.pushState({
      pathname: `${resultUrl}`,
    });
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<DescriptionIcon />}
        onClick={() => {
          window.open(resultUrl, "_blank");
        }}
      >
        {" "}
        상세 결과 보기
      </Button>

      <Button
        sx={{ marginLeft: "100px" }}
        variant="contained"
        onClick={onClick}
        startIcon={<ReplayIcon />}
      >
        {" "}
        검사 다시 하기
      </Button>
    </>
  );
}
export default TestResultPage;
