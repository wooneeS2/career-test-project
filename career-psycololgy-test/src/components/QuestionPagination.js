import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import PaginatedItems from "./MakePagination";
import { Box } from "@mui/material";
import "../style_components/pagination.css";

export function QuestionPagination() {
  const [questions, setQeustions] = useState([]);
  const [isDataOn, setIsDataOn] = useState(false);

  const url =
    "http://www.career.go.kr/inspct/openapi/test/questions?apikey=2cfc3ece4e557d4a41050b92786fdd44&q=6";
  const requestQuestion = async () => {
    const response = await axios.get(url);

    setQeustions(response.data.RESULT);

    questions !== null ? setIsDataOn(true) : setIsDataOn(false);
  };

  useEffect(() => {
    requestQuestion();
  }, []);

  return (
    <div>
      {isDataOn ? (
        <PaginatedItems itemsPerPage={5} items={questions} />
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default QuestionPagination;
