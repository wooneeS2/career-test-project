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
  const [curAnswrs, setCurAnswrs] = useState([]);
  const [postAnswrs, setPostAnswrs] = useState([]);
  const [requestUrl, setRequestUrl] = useState("");
  const [seq, setSeq] = useState("");
  const [resultData, setResultData] = useState([]);
  const [st, setSt] = useState(0);
  const [nd, setNd] = useState(0);
  const url =
    "http://www.career.go.kr/inspct/openapi/test/report?apikey=2cfc3ece4e557d4a41050b92786fdd44&qestrnSeq=6";
  let infoUrl = `https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`;
  const api = "2cfc3ece4e557d4a41050b92786fdd44";
  const qestrnSeq = "6";

  let location = useLocation();

  useEffect(() => {
    console.log("location", location);
  }, []);

  useEffect(() => {
    let result = location.state.newAnswr
      .map((answer, index) => {
        return `B${index + 1}=${answer.value}`;
      })
      .join(" ");
    setPostAnswrs(result);
    console.log("postAnswr", postAnswrs);
  }, [location]);

  useEffect(() => {
    console.log("request post");
    async function requsetPost() {
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

      console.log(result.data);
      setRequestUrl(result.data.RESULT.url);
      console.log("url", requestUrl);
    }
    requsetPost();
  }, [postAnswrs]);

  useEffect(() => {
    let tempSeq = requestUrl.split("seq=")[1];

    console.log("tempSeq", tempSeq);
    setSeq(tempSeq);
    console.log("seq", seq);
  }, [requestUrl]);

  useEffect(() => {
    console.log("request score");
    async function requestGet() {
      console.log("info url", infoUrl);
      const result = await axios.get(infoUrl);
      console.log(result.data);
      setResultData(result.data);
      console.log("result data::", resultData);
    }
    requestGet();
  }, [seq]);

  useEffect(() => {
    async function requestGet() {
      const tempStr = resultData.result["wonScore"];

      const split = await tempStr.split(" ");

      const arr = await split.map(a => {
        const temp = a.split("=");

        const result = [];

        result.push(parseInt(temp[1]));

        return result;
      });
      console.log(arr.flat());
      var score = arr.flat();
      score.pop();
      let max = score.reduce((prev, cur) => {
        return prev > cur ? prev : cur;
      });

      console.log("max", max);
      setSt(max);

      let filterd = score.filter(e => e !== max);

      let second = filterd.reduce((prev, cur) => {
        return prev > cur ? prev : cur;
      });
      console.log(second, "second");
      setNd(second);
    }
    requestGet();
  }, [resultData]);

  // const [correctAnswrs, setCorrectAnswrs] = useState([]);
  // const [response, setResponse] = useState([]);
  // const [uniqAnswrs, setUniqAnswrs] = useState([]);
  // let location = useLocation();
  // const [finalAnswr, setFinalAnswr] = useState("");
  // let why = [];
  // let newArr = [];

  // let resultUrl = "";
  // const [score, setScore] = useState([]);
  // const [st, setSt] = useState("");
  // const [nd, setNd] = useState("");

  //
  // const request_post = async () => {
  //   console.log("first");
  //   //TODO 여기 데이터들 변수로 바꿔주기
  //   //TODO 이름, 나이 ,학년 받아오기

  //   setResponse(result.data);
  //   console.log("response", response);
  //
  // };

  //

  //

  // const requestInfo = async () => {
  //   console.log("second");

  //   const response = await axios.get(infoUrl);
  //
  //   });

  //   setScore(arr.flat());
  //   console.log("score", score);

  //   var max = score[0];
  //   for (var i = 0; i < score.length; i++) {
  //     if (max < score[i]) {
  //       max = score[i];
  //     }
  //     return max;
  //   }
  //   setSt(max);
  //   console.log("max", max);
  //   console.log("st", st);
  // };

  // const numbering = () => {
  //   var max = score[0];
  //   for (var i = 0; i < score.length; i++) {
  //     if (max < score[i]) {
  //       max = score[i];
  //     }
  //     return max;
  //   }
  //   setSt(max);
  //   console.log("max", max);
  //   console.log("st", st);
  // };

  // useEffect(() => {
  //   requestInfo();
  // }, [seq]);

  // useEffect(() => {
  //   console.log("correct::", location);
  // }, [location]);

  // useEffect(() => {
  //   numbering();
  // }, [score]);

  // let history = useHistory();

  // const onClick = () => {
  //   history.push({
  //     pathname: "/test-result",
  //     state: {
  //       answer: finalAnswr,
  //     },
  //   });
  // };

  return (
    <>
      <NextBtnWithoutLink title={"검사 결과 보러가기"} />
    </>
  );
}

export default TestFinishPage();
