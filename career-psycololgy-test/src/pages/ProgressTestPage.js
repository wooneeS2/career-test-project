import React from "react";
import { MainQuestion } from "../style_components/CustomQuestions";
import ProgressBar from "../style_components/CustomProgressBar";
import QuestionPagination from "../components/QuestionPagination";
import HeaderCompo from "../components/Header";

export function ProgressTestPage() {
  return (
    <div>
      <div>
        <HeaderCompo title={"검사 진행"} />
        <ProgressBar value={50} />
        <MainQuestion></MainQuestion>
        <QuestionPagination />
      </div>
    </div>
  );
}

export default ProgressTestPage;
