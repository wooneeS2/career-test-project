import React from "react";
import { MainQuestion } from "../style_components/CustomQuestions";
import ProgressBar from "../style_components/CustomProgressBar";
import QuestionComponents from "../components/QuestionList";
import MainTitle from "../style_components/CustomTitles";

export function ProgressTestPage() {
  return (
    <div>
      <div>
        <MainTitle title={"검사 진행"} />
        <ProgressBar value={50} />
        <MainQuestion></MainQuestion>
        //TODO 문제 시작, 마지막 숫자 params로 받아오기
        <QuestionComponents startNo={0} endNo={5} />
      </div>
    </div>
  );
}

export default ProgressTestPage;
