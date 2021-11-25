import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
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
  Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ReplayIcon from "@mui/icons-material/Replay";
import "../style_components/Tables.css";
import ShareIcon from "@mui/icons-material/Share";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  BarSeries,
} from "@devexpress/dx-react-chart-material-ui";

export function TestResultPage() {
  return (
    <>
      <Typography
        variant="h3"
        align="center"
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        검사 결과
      </Typography>
      <LoadLocation />
    </>
  );
}

function LoadLocation() {
  const [educationData, setEducationData] = useState([]);
  const [majorData, setmajorData] = useState([]);
  const [educationJobs, setEducationJobs] = useState([]);
  const [majorJobs, setMajorJobs] = useState([]);
  const [valueScore, setValueScore] = useState([]);
  let location = useLocation();
  useEffect(() => {
    console.log("location", location);
    setValueScore(location.state.score);
    console.log(valueScore);
  }, []);

  useEffect(() => {
    setEducationData(location.state.education[0]);

    setmajorData(location.state.major[0]);
  }, [location]);

  useEffect(() => {
    const education = () => {
      const Job1 = educationData
        .filter(element => element[2] === 1)
        .map(a => a[1])
        .join(", ");
      createData("중졸이하", Job1);
      const Job2 = educationData
        .filter(element => element[2] === 2)
        .map(a => a[1])
        .join(", ");
      createData("고졸", Job2);
      const Job3 = educationData
        .filter(element => element[2] === 3)
        .map(a => a[1])
        .join(", ");
      createData("전문대졸", Job3);
      const Job4 = educationData
        .filter(element => element[2] === 4)
        .map(a => a[1])
        .join(", ");
      createData("대졸", Job4);
      const Job5 = educationData
        .filter(element => element[2] === 5)
        .map(a => a[1])
        .join(", ");
      createData("대학원졸", Job5);

      setEducationJobs([
        createData("중졸이하", Job1),
        createData("고졸", Job2),
        createData("전문대졸", Job3),
        createData("대졸", Job4),
        createData("대학원졸", Job5),
      ]);
    };

    const major = () => {
      const Job0 = majorData
        .filter(element => element[2] === 0)
        .map(a => a[1])
        .join(", ");
      createData("전공무관", Job0);
      const Job1 = majorData
        .filter(element => element[2] === 1)
        .map(a => a[1])
        .join(", ");
      createData("인문", Job1);
      const Job2 = majorData
        .filter(element => element[2] === 2)
        .map(a => a[1])
        .join(", ");
      createData("사회", Job2);
      const Job3 = majorData
        .filter(element => element[2] === 3)
        .map(a => a[1])
        .join(", ");
      createData("교육", Job3);
      const Job4 = majorData
        .filter(element => element[2] === 4)
        .map(a => a[1])
        .join(",");
      createData("공학", Job4);
      const Job5 = majorData
        .filter(element => element[2] === 5)
        .map(a => a[1])
        .join(", ");
      createData("자연", Job5);
      const Job6 = majorData
        .filter(element => element[2] === 6)
        .map(a => a[1])
        .join(", ");
      createData("의학", Job6);
      const Job7 = majorData
        .filter(element => element[2] === 7)
        .map(a => a[1])
        .join(", ");
      createData("예체능", Job7);

      setMajorJobs([
        createData("계열 무관", Job0),
        createData("인문", Job1),
        createData("사회", Job2),
        createData("교육", Job3),
        createData("공학", Job4),
        createData("자연", Job5),
        createData("의학", Job6),
        createData("예체능", Job7),
      ]);
    };

    education();
    major();
  }, [educationData, majorData]);

  let history = useHistory();

  const onClick = () => {
    sessionStorage.clear();
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
                    width: "100px",
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

  function Ranking() {
    const data = [
      { argument: "능력발휘", value: valueScore[0] },
      { argument: "자율성", value: valueScore[1] },
      { argument: "보수", value: valueScore[2] },
      { argument: "안정성", value: valueScore[3] },
      { argument: "사회적 인정", value: valueScore[4] },
      { argument: "사회봉사", value: valueScore[5] },
      { argument: "자기계발", value: valueScore[6] },
      { argument: "창의성", value: valueScore[7] },
    ];
    return (
      <Paper elevation={0.5} align="center" width={600}>
        <Chart data={data} width={600} height={300}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries
            valueField="value"
            argumentField="argument"
            color="#378b29"
          />
        </Chart>
      </Paper>
    );
  }
  console.log(location);

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(location.state.resultUrl);
      alert("복사되었습니다. 링크를 공유해보세요.");
    } catch (e) {
      alert("복사 실패");
      console.log(e);
    }
  };
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜

  return (
    <>
      <Typography display={"inline"} sx={{ backgroundColor: "#D7E7D4" }}>
        [{sessionStorage.getItem("userName")},
        {sessionStorage.getItem("userGender") === "100324" ? "여자" : "남자"},
        {`${year}년 ${month}월 ${date}일`}]
      </Typography>

      <Typography
        variant="inherit"
        sx={{ marginBottom: "20px", marginTop: "20px" }}
      >
        검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
        생각하는지 <br />
        알려주고, 중요 가치를 충족시켜 줄 수 있는 직업에 대해 생각해 볼 기회를
        제공합니다.
      </Typography>
      <Ranking />

      <Grid container sapcing={6} sx={{ marginTop: "50px" }} justify="center">
        <Grid item xs={4} sx={{ marginLeft: "100px" }} align="center">
          <JobTable data={educationJobs} title="학위" />
        </Grid>

        <Grid items xs={4} sx={{ marginLeft: "100px" }} align="center">
          <JobTable data={majorJobs} title="전공" />
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
              window.open(location.state.resultUrl, "_blank");
            }}
          >
            상세결과 보기{" "}
          </Button>
          <IconButton
            color="primary"
            aria-label="sns-share"
            sx={{ backgroundColor: "#D7E7D4", marginLeft: "20px" }}
            onClick={handleCopyClipBoard}
          >
            <ShareIcon />
          </IconButton>
        </Grid>

        <Grid item xs={11.3} align="center" marginTop="20px">
          <Box height="100%" display="flex" justifyContent="center">
            <Button
              variant="contained"
              sx={{ marginBottom: "50px" }}
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
