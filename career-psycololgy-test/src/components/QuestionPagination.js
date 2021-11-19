import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./pagination.css";
import CircularProgress from "@mui/material/CircularProgress";
import PaginatedItems from "../components/pagination";

export function QuestionPagination() {
  const [questions, setQeustions] = useState([]);
  const [isDataOn, setIsDataOn] = useState(false);

  const url =
    "http://www.career.go.kr/inspct/openapi/test/questions?apikey=2cfc3ece4e557d4a41050b92786fdd44&q=6";
  const requestQuestion = async () => {
    const response = await axios.get(url);

    setQeustions(response.data.RESULT);
    console.log(`isDataOn ::: ${isDataOn}`);
    questions !== null ? setIsDataOn(true) : setIsDataOn(false);
  };

  useEffect(() => {
    requestQuestion();
  }, []);

  console.log("questions:", questions);

  return (
    <div>
      {isDataOn ? (
        <PaginatedItems itemsPerPage={5} items={questions} />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default QuestionPagination;
