import React from "react";
import { MainQuestion } from "../style_components/CustomQuestions";
import ProgressBar from "../style_components/CustomProgressBar";
import QuestionPagination from "../components/QuestionPagination";
import MainTitle from "../style_components/CustomTitles";

// 검사 진행페이지 큰 틀
export function ProgressTestPage() {
  return (
    <div>
      <div>
        <MainTitle title={"검사 진행"} />
        {/* //TODO value값을 전역으로 관리할 수 있는 방법 생각해보기 */}
        <ProgressBar value={100} />
        {/* 전체 질문이 표시되는 컴포넌트 */}
        <MainQuestion></MainQuestion>
        {/* 질문이 표시되는 컴포넌트 */}
        <QuestionPagination />
      </div>
    </div>
  );
}

export default ProgressTestPage;
