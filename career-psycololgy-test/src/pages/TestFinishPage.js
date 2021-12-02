import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import { NextBtnWithoutLink } from "../style_components/CustomButtons";

// 검사완료 페이지(검사 결과 페이지와는 다름)
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

// useLocation을 사용하기 위해 만든 컴포넌트
//TODO 분리할 수 있는 컴포넌트 분리하기
function LoadLocation() {
  let location = useLocation();
  const [postAnswrs, setPostAnswrs] = useState([]);
  const [requestUrl, setRequestUrl] = useState("");
  const [seq, setSeq] = useState("");
  const [resultData, setResultData] = useState([]);
  const [st, setSt] = useState(0);
  const [nd, setNd] = useState(0);
  const [allScore, setAllScore] = useState([]);
  const [educationJobs, setEducationJobs] = useState([]);
  const [majorJobs, setMajorJobs] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `http://www.career.go.kr/inspct/openapi/test/report?apikey=${apiKey}&qestrnSeq=6`;

  const qestrnSeq = "6";

  // 컴포넌트가 생성될 때, location의 정답을 불러와저장
  useEffect(() => {
    const result = location.state.newAnswr
      .map((answer, index) => {
        return `B${index + 1}=${answer.value}`;
      })
      .join(" ");
    setPostAnswrs(result);
  }, [location]);

  // answer가 저장되면 session storage의 값들과 다른 값들을 불러와서 post 요청
  useEffect(() => {
    async function requsetPost() {
      setUserInfo(JSON.parse(sessionStorage.getItem("user")));
      let targetSe = userInfo.targetSe;
      let userName = userInfo.name;
      let userGrade = userInfo.grade;
      let userGender = userInfo.gender;
      let school = userInfo.belong;

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
    }
    requsetPost();
  }, [postAnswrs]);

  // requestUrl의 값이 바뀌면 검사 결과를 get할때 필요한 seq 값 저장
  useEffect(() => {
    let tempSeq = requestUrl.split("seq=")[1];

    setSeq(tempSeq);
  }, [requestUrl]);

  // tempseq가 생기면 검사 결과 get 요청
  const [tempStr, setTempStr] = useState("");
  useEffect(() => {
    async function requestGet() {
      let infoUrl = `https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`;

      const result = await axios.get(infoUrl);

      setResultData(result.data);

      setTempStr(result.data.result.wonScore);
    }
    requestGet();
  }, [seq]);

  // 검사 결과중 가장 높은 점수와 두번째 점수 저장
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
    }
    requestGet();
  }, [tempStr]);

  useEffect(() => {
    //학력별 직업 get 요청
    async function requestEducation() {
      let jobUrl = `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${
        st + 1
      }&no2=${nd + 1}`;
      const response = await axios.get(jobUrl);

      setEducationJobs([response.data]);
    }

    //전공별 직업 get 요청
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

  //검사 결과 페이지로 넘어갈 때 useHistory를 이용하여 각종 정보들을 함께 보냄.
  const onClick = () => {
    history.push({
      pathname: "/test-result",
      state: {
        resultUrl: requestUrl,
        score: allScore,
        education: educationJobs,
        major: majorJobs,
        userInfo: userInfo,
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
          {userInfo.name}
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
