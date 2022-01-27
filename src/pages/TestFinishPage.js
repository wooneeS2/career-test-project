import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { NextBtnWithoutLink } from "../style_components/CustomButtons";
import { Typography, Box } from "@mui/material";
import axios from "axios";

export function TestFinishPage() {
  return (
    <>
      <Typography
        variant="h4"
        sx={{ marginBottom: "20px", marginLeft: "100px" }}
      >
        검사가 완료되었습니다.
      </Typography>

      <LoadLocation />
    </>
  );
}

function LoadLocation() {
  const [postAnswrs, setPostAnswrs] = useState([]);
  const [requestUrl, setRequestUrl] = useState("");
  const [seq, setSeq] = useState("");
  const [resultData, setResultData] = useState([]);
  const [st, setSt] = useState(0);
  const [nd, setNd] = useState(0);
  const [allScore, setAllScore] = useState([]);
  const [educationJobs, setEducationJobs] = useState([]);
  const [majorJobs, setMajorJobs] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `http://www.career.go.kr/inspct/openapi/test/report?apikey=${apiKey}&qestrnSeq=6`;

  const qestrnSeq = "6";

  let location = useLocation();

  useEffect(() => {
    console.log("location", location);
  }, []);

  useEffect(() => {
    const result = location.state.newAnswr
      .map((answer, index) => {
        return `B${index + 1}=${answer.value}`;
      })
      .join(" ");
    setPostAnswrs(result);
  }, [location]);

  useEffect(() => {
    async function requsetPost() {
      let targetSe = sessionStorage.getItem("userTarget");
      let userName = sessionStorage.getItem("userName");
      let userGrade = sessionStorage.getItem("userGrade");
      let userGender = sessionStorage.getItem("userGender");
      let school = sessionStorage.getItem("userBelong");

      const result = await axios.post(url, {
        apikey: apiKey,
        qestrnSeq: qestrnSeq,
        trgetSe: targetSe,
        name: userName,
        gender: userGender,
        school: school,
        grade: userGrade,
        email: "",
        startDtm: 1550466291034,
        answers: postAnswrs,
        // answers:
        //   "B1=30 B2=30 B3=30 B4=7 B5=10 B6=12 B7=14 B8=15 B9=17 B10=20 B11=21 B12=23 B13=26 B14=28 B15=30 B16=31 B17=30 B18=30 B19=30 B20=30 B21=30 B22=44 B23=45 B24=48 B25=49 B26=51 B27=53 B28=56",
      });

      setRequestUrl(result.data.RESULT.url);
      console.log("결과", requestUrl);
    }
    requsetPost();
  }, [postAnswrs]);

  useEffect(() => {
    let tempSeq = requestUrl.split("seq=")[1];
    console.log(tempSeq);

    setSeq(tempSeq);
  }, [requestUrl]);

  const [tempStr, setTempStr] = useState("");
  useEffect(() => {
    async function requestGet() {
      let infoUrl = `https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`;

      console.log("seq", seq);
      const result = await axios.get(infoUrl);

      setResultData(result.data);

      setTempStr(result.data.result.wonScore);
    }
    requestGet();
  }, [seq]);

  useEffect(() => {
    async function requestGet() {
      const split = tempStr.split(" ");

      const arr = split.map(a => {
        const temp = a.split("=");

        const result = [];

        result.push(parseInt(temp[1]));

        return result;
      });

      var score = arr.flat();
      score.pop();
      setAllScore(score);
      let scores = [...score, 0];

      let max = scores.reduce((prev, cur) => {
        return prev > cur ? prev : cur;
      }, 0);

      setSt(scores.indexOf(max));

      let found = scores.findIndex(e => e === max);

      let seScore = score.slice();
      delete seScore[found];

      let second = seScore.reduce((prev, cur) => {
        return prev > cur ? prev : cur;
      }, 0);

      setNd(seScore.indexOf(second));
      console.log("2등", second, "인덱스", seScore.indexOf(second));
      console.log(score);
    }
    requestGet();
  }, [tempStr]);

  useEffect(() => {
    //학력별 직업
    async function requestEducation() {
      let jobUrl = `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${
        st + 1
      }&no2=${nd + 1}`;
      const response = await axios.get(jobUrl);

      setEducationJobs([response.data]);
    }

    async function requestMajor() {
      let majorUrl = `https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${
        st + 1
      }&no2=${nd + 1}`;
      const response = await axios.get(majorUrl);

      setMajorJobs([response.data]);
    }

    requestEducation();
    requestMajor();
  }, [st, nd]);

  let history = useHistory();

  const onClick = () => {
    history.push({
      pathname: "/test-result",
      state: {
        resultUrl: requestUrl,
        score: allScore,
        education: educationJobs,
        major: majorJobs,
      },
    });
  };
  let values = [
    "능력발휘",
    "자율성",
    "보수",
    "안정성",
    "사회적인정",
    "사회봉사",
    "자기계발",
    "창의성",
  ];
  let one = values[st];
  let two = values[nd];

  return (
    <>
      <Box sx={{ margintTop: "20px" }}>
        <Typography
          display={"inline"}
          sx={{ fontWeight: "bold", backgroundColor: "#D7E7D4" }}
        >
          {sessionStorage.getItem("userName")}
        </Typography>
        <Typography display={"inline"}>
          님이 직업을 선택할 때 있어서 중요하게 생각하는 <br />
          가치는{" "}
        </Typography>
        <Typography
          display={"inline"}
          sx={{ fontWeight: "bold", backgroundColor: "#D7E7D4" }}
        >
          {one}
        </Typography>
        ,{" "}
        <Typography
          display={"inline"}
          sx={{ fontWeight: "bold", backgroundColor: "#D7E7D4" }}
        >
          {two}
        </Typography>
        입니다.
      </Box>
      <Box sx={{ marginTop: "25px" }}>
        <NextBtnWithoutLink title={"검사 결과 보러가기"} onClick={onClick} />
      </Box>
    </>
  );
}

export default TestFinishPage();
