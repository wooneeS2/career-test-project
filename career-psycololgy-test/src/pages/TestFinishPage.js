import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { NextBtnWithoutLink } from "../style_components/CustomButtons";
import axios from "axios";
export function TestFinishPage() {
  return (
    <>
      <p>검사 완료</p>
      <LoadLocation />
    </>
  );
}

function LoadLocation() {
  const [correctAnswrs, setCorrectAnswrs] = useState([]);
  const [response, setResponse] = useState([]);
  const [uniqAnswrs, setUniqAnswrs] = useState([]);
  let location = useLocation();
  const [finalAnswr, setFinalAnswr] = useState("");
  let why = [];
  let newArr = [];

  const [seq, setSeq] = useState("");
  const url =
    "http://www.career.go.kr/inspct/openapi/test/report?apikey=2cfc3ece4e557d4a41050b92786fdd44&qestrnSeq=6";
  let infoUrl = `https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`;
  const api = "2cfc3ece4e557d4a41050b92786fdd44";
  const qestrnSeq = "6";

  let resultUrl = "";
  const [score, setScore] = useState([]);
  const [st, setSt] = useState("");
  const [nd, setNd] = useState("");

  useEffect(() => {
    // console.log("location", location);
    // setCorrectAnswrs(correctAnswrs);
    // console.log("correct::", correctAnswrs);
    // why = location.state.newAnswr;
    // console.log("first:", why);
    request_post();
  }, []);
  const request_post = async () => {
    console.log("first");
    //TODO 여기 데이터들 변수로 바꿔주기
    //TODO 이름, 나이 ,학년 받아오기
    const result = await axios.post(url, {
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
    setResponse(result.data);
    console.log("response", response);
    resultUrl = response.RESULT.url;
    console.log(resultUrl);
    let tempSeq = resultUrl.split("seq=")[1];

    console.log("tempSeq", tempSeq);
    setSeq(tempSeq);
    console.log("seq", seq);
  };

  useEffect(() => {
    newArr = why
      .slice()
      .reverse()
      .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
      .reverse()
      .sort(function (a, b) {
        return a.id - b.id;
      });

    console.log("second::", newArr);
    let result = newArr.map(a => a.value);
    console.log("third::", result);
    let temp = result
      .map((answer, index) => {
        return `B${index + 1}=${answer}`;
      })
      .join(" ");
    setFinalAnswr(temp);

    console.log("final::", finalAnswr);
  }, [location]);

  const requestInfo = async () => {
    console.log("second");

    const response = await axios.get(infoUrl);
    const tempStr = response.data.result.wonScore;
    console.log(response.data);

    const split = await tempStr.split(" ");

    const arr = await split.map(a => {
      const temp = a.split("=");

      const result = [];

      result.push(parseInt(temp[1]));

      return result;
    });

    setScore(arr.flat());
    console.log("score", score);

    var max = score[0];
    for (var i = 0; i < score.length; i++) {
      if (max < score[i]) {
        max = score[i];
      }
      return max;
    }
    setSt(max);
    console.log("max", max);
    console.log("st", st);
  };

  const numbering = () => {
    var max = score[0];
    for (var i = 0; i < score.length; i++) {
      if (max < score[i]) {
        max = score[i];
      }
      return max;
    }
    setSt(max);
    console.log("max", max);
    console.log("st", st);
  };

  useEffect(() => {
    requestInfo();
  }, [seq]);

  useEffect(() => {
    console.log("correct::", location);
  }, [location]);

  useEffect(() => {
    numbering();
  }, [score]);

  let history = useHistory();

  const onClick = () => {
    history.push({
      pathname: "/test-result",
      state: {
        answer: finalAnswr,
      },
    });
  };

  return (
    <>
      <NextBtnWithoutLink title={"검사 결과 보러가기"} onClick={onClick} />
    </>
  );
}

export default TestFinishPage();
