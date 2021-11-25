import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { NextBtnWithoutLink } from "../style_components/CustomButtons";
import { Typography, Box } from "@mui/material";
import axios from "axios";

export function TestFinishPage() {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
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
  const url =
    "http://www.career.go.kr/inspct/openapi/test/report?apikey=2cfc3ece4e557d4a41050b92786fdd44&qestrnSeq=6";

  const api = "2cfc3ece4e557d4a41050b92786fdd44";
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
        answers: postAnswrs,
        // answers:
        //   "B1=1 B2=4 B3=5 B4=8 B5=9 B6=11 B7=14 B8=15 B9=17 B10=20 B11=21 B12=23 B13=26 B14=28 B15=29 B16=31 B17=33 B18=36 B19=37 B20=39 B21=41 B22=44 B23=45 B24=48 B25=49 B26=51 B27=53 B28=56",
      });

      setRequestUrl(result.data.RESULT.url);
    }
    requsetPost();
  }, [postAnswrs]);

  useEffect(() => {
    let tempSeq = requestUrl.split("seq=")[1];

    setSeq(tempSeq);
  }, [requestUrl]);

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
      let max = score.reduce((prev, cur) => {
        return prev > cur ? prev : cur;
      }, 0);

      setSt(score.indexOf(max) + 1);

      let filterd = score.filter(e => e !== max);

      let second = filterd.reduce((prev, cur) => {
        return prev > cur ? prev : cur;
      }, 0);
      var newScore = arr.flat();

      setNd(newScore.indexOf(second) + 1);
    }
    requestGet();
  }, [tempStr]);

  useEffect(() => {
    //학력별 직업
    async function requestEducation() {
      let jobUrl = `https://inspct.career.go.kr/inspct/api/psycho/value/jobs?no1=${st}&no2=${nd}`;
      const response = await axios.get(jobUrl);
      setEducationJobs([...educationJobs, response.data]);
    }

    async function requestMajor() {
      let jobUrl = `https://inspct.career.go.kr/inspct/api/psycho/value/majors?no1=${st}&no2=${nd}`;
      const response = await axios.get(jobUrl);
      setMajorJobs([...majorJobs, response.data]);
    }

    requestEducation();
    requestMajor();
  }, [nd]);

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
  let one = values[st + 1];
  let two = values[nd + 1];

  return (
    <>
      <Box sx={{ margintTop: "20px" }}>
        <Typography display={"inline"}>
          000님이 직업을 선택할 때 있어서 중요하게 생각하는 <br />
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
      <NextBtnWithoutLink title={"검사 결과 보러가기"} onClick={onClick} />
    </>
  );
}

export default TestFinishPage();
