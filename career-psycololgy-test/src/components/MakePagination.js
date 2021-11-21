import ReactPaginate from "react-paginate";
import React, { useEffect, useState, useRef } from "react";
import "../style_components/pagination.css";
import QuestionList from "../style_components/CustomQuestions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export function PaginatedItems({ itemsPerPage, items, questionIndex }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [answer, setAnswr] = useState([
    {
      id: "",
      value: "",
    },
  ]);

  const [filterAnswr, setFilterAnswr] = useState([]);

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

  // useEffect(() => {
  //   itemOffset + itemsPerPage === filterArr.length
  //     ? setIsNext(true)
  //     : setIsNext(false);
  //   console.log("is Next?? :: ", isNext);
  //   // console.log("didnt work");
  // }, [answer]);

  useEffect(() => {
    if (filterAnswr === null) {
      return;
    } else {
      const newArr = answer
        .slice()
        .reverse()
        .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
        .reverse();
      console.log("newArr", newArr);
      setFilterAnswr(newArr);
      console.log("filter::", filterAnswr);
    }
  }, [answer]);

  const handleRadioBtn = ({ id, value }) => {
    const oneAnswer = {
      id: id,
      value: value,
    };
    setAnswr(answer.concat(oneAnswer));
    console.log(answer);
    const newArr = answer
      .slice()
      .reverse()
      .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
      .reverse();
    console.log("newArr", newArr);
    setFilterAnswr(newArr);
    console.log("filter::", filterAnswr);
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
                  handleRadioBtn({ id: q.qitemNo, value: e.target.value });
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

      <ReactPaginate
        nextLabel={isNext ? <Button>다음</Button> : <p>비활성화</p>}
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
      {isEnd ? (
        <Link to="/test-finish">
          <Button>검사완료</Button>
        </Link>
      ) : null}
    </>
  );
}

export default PaginatedItems;
