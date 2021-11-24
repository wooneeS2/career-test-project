import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { NextBtnWithoutLink } from "../style_components/CustomButtons";
export function TestFinishPage() {
  return (
    <>
      <p>검사 완료</p>
      <LoadLocation />
    </>
  );
}

function LoadLocation() {
  const [correctAnswrs, setCorrectAnswrs] = useState([]);
  const [uniqAnswrs, setUniqAnswrs] = useState([]);
  let location = useLocation();
  const [finalAnswr, setFinalAnswr] = useState("");
  let why = [];
  let newArr = [];

  useEffect(() => {
    console.log("location", location);
    setCorrectAnswrs(location.state.newAnswr);
    console.log("correct::", correctAnswrs);
    why = location.state.newAnswr;
    console.log("first:", why);
  }, []);

  useEffect(() => {
    newArr = why
      .slice()
      .reverse()
      .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
      .reverse()
      .sort(function (a, b) {
        return a.id - b.id;
      });

    console.log("second::", newArr);
    let result = newArr.map(a => a.value);
    console.log("third::", result);
    let temp = result
      .map((answer, index) => {
        return `B${index + 1}=${answer}`;
      })
      .join(" ");
    setFinalAnswr(temp);

    console.log("final::", finalAnswr);
  }, [location]);

  let history = useHistory();

  const onClick = () => {
    history.push({
      pathname: "/test-result",
      state: {
        answer: finalAnswr,
      },
    });
  };
  return (
    <>
      <NextBtnWithoutLink title={"검사 결과 보러가기"} onClick={onClick} />
    </>
  );
}

export default TestFinishPage();
