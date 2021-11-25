import React, { useEffect, useState } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";

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
              //TODO url 추가해주기
              // window.open(resultUrl, "_blank");
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
