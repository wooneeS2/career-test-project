import React from "react";
import { MainQuestion } from "../components/Questions";
import ProgressBar from "../components/ProgressBar";
import QuestionPagination from "../components/QuestionPagination";
import MainTitle from "../style_components/Titles";

export function ProgressTest() {
  return (
    <div>
      <div>
        <MainTitle title={"검사 진행"} />
        <ProgressBar value={50} />
        <MainQuestion></MainQuestion>
        <QuestionPagination />
      </div>
    </div>
  );
}

export default ProgressTest;
