import React from "react";
import { MainQuestion } from "../style_components/CustomQuestions";
import ProgressBar from "../style_components/CustomProgressBar";
import QuestionPagination from "../components/QuestionPagination";
import MainTitle from "../style_components/CustomTitles";

export function ProgressTestPage() {
  return (
    <div>
      <div>
        <MainTitle title={"검사 진행"} />
        <ProgressBar value={100} />
        <MainQuestion></MainQuestion>
        <QuestionPagination />
      </div>
    </div>
  );
}

export default ProgressTestPage;
