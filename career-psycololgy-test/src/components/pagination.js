import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "./pagination.css";
import QuestionList from "./Questions";
import Button from "@mui/material/Button";

function Items({ currentItems }) {
  const [answer, setAnswr] = useState([]);
  useEffect(() => {
    console.log(`answer array's number data :: ${answer.qitemNo}`);
    console.log(`answer array's answer data :: ${answer.qitAnswr}`);
  }, [answer]);
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
                const newAnswr = answer;
                var noKey = q.qitemNo;
                //TODO 키 값 중복 제거하기
                //TODO 키 값을 기준으로 오름차순 정리해주기

                newAnswr.push({ [noKey]: e.target.value });
                setAnswr(newAnswr);
                console.log(answer);
              }}
            />
          </div>
        ))}
    </div>
  );
}

export function PaginatedItems({ itemsPerPage, items, questionIndex }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));

    endOffset == pageCount * itemsPerPage ? setIsEnd(true) : setIsEnd(false);
    console.log(`isEnd?? :: ${isEnd}`);
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <>
      <Items currentItems={currentItems} number={questionIndex} />
      <ReactPaginate
        nextLabel={<Button>다음</Button>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<Button>이전</Button>}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        pageClassName="numbering"
        disabledClassName={"disabled-first-end"}
      />
      {/* TODO 검사완료 페이지로 라우트해주기 */}
      {/* TODO 정답이 다 채워지지 않았을 경우 경고문 표시하고 링크 작동 X */}
      {isEnd ? <Button>검사완료</Button> : null}
    </>
  );
}

export default PaginatedItems;
