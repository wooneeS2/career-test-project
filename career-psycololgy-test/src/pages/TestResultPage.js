import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
      answers:
        "B1=1 B2=1 B3=1 B4=1 B5=1 B6=1 B7=1 B8=1 B9=1 B10=1 B11=1 B12=1 B13=1 B14=1 B15=1 B16=1 B17=1 B18=1 B19=1 B20=1 B21=1 B22=1 B23=1 B24=1 B25=1 B26=1 B27=1 B28=1 ",
    });
    console.log(response.data);
  };

  useEffect(() => {
    request_post();
  }, []);

  useEffect(() => {
    console.log("correct::", location);
  }, [location]);

  return <p>검사결과</p>;
}
export default TestResultPage;
