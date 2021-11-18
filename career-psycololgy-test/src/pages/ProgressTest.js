import React from "react";
import { QuestionList, MainQuestion } from "../components/Questions";
import { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "../components/ProgressBar";
import QuestionPagination from "../components/QuestionPagination";

export function ProgressTest() {
  return (
    <div>
      <div>
        <ProgressBar value={50} />
        <MainQuestion></MainQuestion>
        <QuestionPagination />
      </div>
    </div>
  );
}

export default ProgressTest;
