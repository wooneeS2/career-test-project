import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ReplayIcon from "@mui/icons-material/Replay";
import "../style_components/Tables.css";
import ShareIcon from "@mui/icons-material/Share";

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
  const [seq, setSeq] = useState("");
  const url =
    "http://www.career.go.kr/inspct/openapi/test/report?apikey=2cfc3ece4e557d4a41050b92786fdd44&qestrnSeq=6";
  let infoUrl = `https://www.career.go.kr/inspct/api/psycho/report?seq=${seq}`;
  const api = "2cfc3ece4e557d4a41050b92786fdd44";
  const qestrnSeq = "6";
  let answers = location.state.answer;
  let resultUrl = "";
  const [score, setScore] = useState([]);
  const [st, setSt] = useState("");
  const [nd, setNd] = useState("");
  console.log("answers:", answers);

  const request_post = async () => {
    console.log("first");
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
    let tempSeq = resultUrl.split("seq=")[1];

    console.log(tempSeq);
    setSeq(tempSeq);
    console.log(seq);
  };

  const requestInfo = async () => {
    console.log("second");

    const response = await axios.get(infoUrl);
    const tempStr = response.data.result.wonScore;

    const split = tempStr.split(" ");

    const arr = split.map(a => {
      const temp = a.split("=");

      const result = [];

      result.push(parseInt(temp[1]));

      return result;
    });

    setScore(arr.flat());
    console.log(score);
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
    request_post();
  }, []);
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
      pathname: "/",
    });
  };

  function createData(classification, jobs) {
    return {
      classification,
      jobs,
    };
  }
  const educationRows = [
    createData("중졸 이하", [
      "foo",
      "boo",
      "coo",
      "voo",
      "dfdasfsadfasdfcxvzcxv",
      ,
    ]),
    createData("고졸", ["one", "two", "three"]),
    createData("전문대졸", ["1", "2", "3", "4"]),
    createData("대졸", ["a", "b", "c", "d"]),
    createData("대학원졸", ["s", "a", "v", "e"]),
  ];
  const majorRows = [
    createData("인문", ["foo", "boo", "coo", "voo"]),
    createData("사회", ["one", "two", "three"]),
    createData("교육", ["1", "2", "3", "4"]),
    createData("공학", ["a", "b", "c", "d"]),
    createData("자연", ["s", "a", "v", "e"]),
    createData("의학", ["s", "a", "v", "e"]),
    createData("예체능", ["s", "a", "v", "e"]),
  ];

  function JobTable({ data, title }) {
    return (
      <TableContainer component={Paper} classes="type09">
        <Table aria-label="caption table">
          <TableHead>
            <TableRow>
              {/* 열 종류(대분류) */}
              <TableCell
                sx={{
                  padding: "10px",
                  fontWeight: "bold",
                  verticalAlign: "top",
                  color: "#163710",
                  borderBottom: "3px solid #26611C",
                }}
              >
                {title}
              </TableCell>
              <TableCell
                sx={{
                  padding: "10px",
                  fontWeight: "bold",
                  verticalAlign: "top",
                  color: "#163710",
                  borderBottom: "3px solid #26611C",
                }}
                align="justify"
              >
                추천직업
              </TableCell>
            </TableRow>
          </TableHead>
          {/* 행 종류(각각의 값) */}
          <TableBody>
            {data.map(row => (
              <TableRow key={row.classification} size="small">
                <TableCell
                  sx={{
                    width: "150px",
                    padding: "10px",
                    fontWeight: "bold",
                    verticalAlign: "top",
                    borderBottom: "1px solid #ccc",
                    background: "#D3DFD1",
                  }}
                  component="th"
                  scope="row"
                >
                  {row.classification}
                </TableCell>

                <TableCell
                  align="justify"
                  sx={{
                    padding: "10px",
                    verticalAlign: "top",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  {row.jobs}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <>
      <p>000님께 중요한 가치는 $$$과 %%%입니다. </p>
      <p>
        검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
        생각하는지 알려주고, 중요 가치를 충족시켜 줄 수 있는 직업에 대해 생각해
        볼 기회를 제공합니다.
      </p>

      <Grid container sapcing={6} sx={{ marginTop: "50px" }} justify="center">
        <Grid item xs={4} sx={{ marginLeft: "100px" }} align="center">
          <JobTable data={educationRows} title="학위" />
        </Grid>

        <Grid items xs={4} sx={{ marginLeft: "100px" }} align="center">
          <JobTable data={majorRows} title="전공" />
        </Grid>
        <Grid items xs={12}>
          <p>
            각 직업별 자세한 설명은 하단의 '상세결과 보기'를 클릭하면 확인할 수
            있습니다.
          </p>
        </Grid>

        <Grid item xs={12} align="center" marginTop="10px">
          <Button
            variant="contained"
            startIcon={<DescriptionIcon />}
            onClick={() => {
              window.open(resultUrl, "_blank");
            }}
          >
            상세결과 보기{" "}
          </Button>
          <IconButton
            color="primary"
            aria-label="sns-share"
            sx={{ backgroundColor: "#D7E7D4", marginLeft: "20px" }}
          >
            <ShareIcon />
          </IconButton>
        </Grid>

        <Grid item xs={11.3} align="center" marginTop="20px">
          <Box height="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              onClick={onClick}
              startIcon={<ReplayIcon />}
            >
              {" "}
              검사 다시 하기
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
export default TestResultPage;
