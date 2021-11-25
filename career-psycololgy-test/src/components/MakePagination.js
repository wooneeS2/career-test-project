import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "../style_components/pagination.css";
import QuestionList from "../style_components/CustomQuestions";
import {
  PageButton,
  NextBtnWithoutLink,
} from "../style_components/CustomButtons";
import { useHistory } from "react-router-dom";

export function PaginatedItems({ itemsPerPage, items, questionIndex }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [newAnswr, setNewAnswr] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
    endOffset === pageCount * itemsPerPage ? setIsEnd(true) : setIsEnd(false);
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const Items = () => {
    return (
      <div className="items">
        {currentItems &&
          currentItems.map((q, index) => (
            <div key={`${index}${q[index]}`}>
              <QuestionList
                key={`${index}${q[index]}`}
                index={q.qitemNo}
                questions={q}
                handleRadioBtn={e => {
                  const values = e.target.value;
                  const oneAnswr = {
                    id: q.qitemNo,
                    value: values,
                  };

                  setNewAnswr(() => {
                    const temp = newAnswr;
                    temp.push(oneAnswr);
                    const newLen = newAnswr
                      .slice()
                      .reverse()
                      .filter(
                        (v, i, a) => a.findIndex(t => t.id === v.id) === i
                      )
                      .reverse();
                    console.log(newLen);

                    return temp;
                    //FIXME 중복을 제거한 배열을 넣으면 라디오 버튼 클릭이 안됨
                    // return newLen;
                  });

                  console.log("new::", newAnswr);
                }}
              />
            </div>
          ))}
      </div>
    );
  };

  let history = useHistory();
  function handleClick() {
    history.push({
      pathname: "/test-finish",
      state: {
        newAnswr: newAnswr
          .slice()
          .reverse()
          .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
          .reverse()
          .sort(function (a, b) {
            return a.id - b.id;
          }),
      },
    });
  }

  return (
    <>
      <Items currentItems={currentItems} number={questionIndex} />
      {/* TODO 응답 배열의 개수 == endOffset이면 버튼 활성화 */}

      <ReactPaginate
        nextLabel={<PageButton title={"다음"} disabled={true} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<PageButton title={"이전"} disabled={true} />}
        containerClassName="pagination"
        renderOnZeroPageCount={null}
        pageClassName="numbering"
      />

      {/* TODO 응답 배열의 개수 !== 전체 문항의 개수 경고문 표시하고 링크 작동 X */}
      {/* {<NextBtn toPath={"/test-finish"} title={"검사완료"} isActive={false} />} */}
      {isEnd ? (
        <NextBtnWithoutLink title={"검사 완료"} onClick={handleClick} />
      ) : null}
    </>
  );
}

export default PaginatedItems;
