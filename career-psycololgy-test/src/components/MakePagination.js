import ReactPaginate from "react-paginate";
import React, { useEffect, useState, useCallback } from "react";
import "../style_components/pagination.css";
import QuestionList from "../style_components/CustomQuestions";
import { NextBtn, PageButton } from "../style_components/CustomButtons";

export function PaginatedItems({ itemsPerPage, items, questionIndex }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [answrLen, setAnswrLen] = useState(0);

  const [newAnswr, setNewAnswr] = useState([]);
  const [uniqArr, setUniqArr] = useState([]);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));

    endOffset == pageCount * itemsPerPage ? setIsEnd(true) : setIsEnd(false);
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const rmDuplication = () => {
    const newLen = newAnswr
      .slice()
      .reverse()
      .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
      .reverse();
    console.log(newLen.length);
    setAnswrLen(newLen);
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

                  //TODO 중복제거가 필요한데 여기서 일어나면 안됨!
                  setNewAnswr(() => {
                    const temp = newAnswr;
                    temp.push(oneAnswr);

                    return temp;
                  });

                  console.log("new::", newAnswr);
                }}
              />
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      <Items currentItems={currentItems} number={questionIndex} />
      {/* TODO 응답 배열의 개수 == endOffset이면 버튼 활성화 */}

      <ReactPaginate
        nextLabel={
          <PageButton title={"다음"} disabled={answrLen !== 0 ? true : false} />
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<PageButton title={"이전"} disabled={!isNext} />}
        containerClassName="pagination"
        renderOnZeroPageCount={null}
        pageClassName="numbering"
      />

      {/* TODO 응답 배열의 개수 !== 전체 문항의 개수 경고문 표시하고 링크 작동 X */}
      {isEnd ? (
        <NextBtn
          toPath={isEnd ? "#" : "/test-finish"}
          title={"검사완료"}
          isActive={isEnd ? true : false}
        />
      ) : null}
    </>
  );
}

export default PaginatedItems;
