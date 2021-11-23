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

  useEffect(() => {
    console.log("location", location);
    setCorrectAnswrs(location.state.newAnswr);
    console.log("correct::", correctAnswrs);
    //FIXME 비동기처리 해줘야함!!
    setUniqAnswrs(
      correctAnswrs
        .slice()
        .reverse()
        .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
        .reverse()
        .sort(function (a, b) {
          return a.id - b.id;
        })
    );
    console.log("uniq", uniqAnswrs);
  }, [location]);

  let result = uniqAnswrs.map(a => a.value);
  console.log(result);
  let finalAnswr = result
    .map((answer, index) => {
      return `B${index + 1}=${answer}`;
    })
    .join(" ");

  console.log("final::", finalAnswr);
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
