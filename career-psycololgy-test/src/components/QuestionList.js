import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../style_components/pagination.css";
import CircularProgress from "@mui/material/CircularProgress";
import QuestionList from "../style_components/CustomQuestions";
import { PageBtn } from "../style_components/CustomButtons";

export function QuestionComponent({ startNo, endNo }) {
  const [questions, setQeustions] = useState([]);
  const [isDataOn, setIsDataOn] = useState(false);
  const [answr, setAnswr] = useState([{ id: "", value: "" }]);
  const [newAnswr, setNewAnswr] = useState([]);

  const url =
    "http://www.career.go.kr/inspct/openapi/test/questions?apikey=2cfc3ece4e557d4a41050b92786fdd44&q=6";
  const requestQuestion = async () => {
    const response = await axios.get(url);

    setQeustions(response.data.RESULT.slice(startNo, endNo));
    console.log(`isDataOn ::: ${isDataOn}`);
    questions !== null ? setIsDataOn(true) : setIsDataOn(false);
  };

  useEffect(() => {
    requestQuestion();
  }, []);

  const Items = ({ currentItems }) => {
    return (
      <div className="items">
        {currentItems &&
          currentItems.map((q, index) => (
            <div key={`${index}${q[index]}`}>
              {/* //TODO 응답 항목 배열 추가하기 */}
              <QuestionList
                key={`${index}${q[index]}`}
                index={q.qitemNo}
                questions={q}
              />
            </div>
          ))}
      </div>
    );
  };
  const data = "hello";
  const datas = [{ id: 1, value: 2 }];
  return (
    <div>
      {isDataOn ? (
        <Items currentItems={questions}></Items>
      ) : (
        <CircularProgress />
      )}
      {/* //TODO 응답 항목을 다 채웠을 때 다음 페이지 활성화 */}
      {/* <PageBtn
        path={{
          pathname: "/test-progress/1",
          state: { data: data, datas: datas },
        }}
        title={"다음페이지"}
      /> */}
    </div>
  );
}

export default QuestionComponent;
