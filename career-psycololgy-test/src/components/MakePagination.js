import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "../style_components/pagination.css";
import QuestionList from "../style_components/CustomQuestions";
import { NextBtn, PageButton } from "../style_components/CustomButtons";

export function PaginatedItems({ itemsPerPage, items, questionIndex }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const [isEnd, setIsEnd] = useState(true);
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));

    endOffset == pageCount * itemsPerPage ? setIsEnd(true) : setIsEnd(false);
    console.log(`isEnd?? :: ${isEnd}`);
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
              />
            </div>
          ))}
      </div>
    );
  };

  return (
    <>
      <Items currentItems={currentItems} number={questionIndex} />

      <ReactPaginate
        nextLabel={<PageButton title={"다음"} disabled={isEnd} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<PageButton title={"이전"} disabled={!isNext} />}
        containerClassName="pagination"
        renderOnZeroPageCount={null}
        pageClassName="numbering"
      />

      {/* TODO 정답이 다 채워지지 않았을 경우 경고문 표시하고 링크 작동 X */}
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
