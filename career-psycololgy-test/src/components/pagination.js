import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import "./pagination.css";
import QuestionList from "./Questions";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";

function Items({ currentItems, number }) {
  const answer = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div className="items">
      {currentItems &&
        currentItems.map((q, index) => (
          <div>
            <QuestionList
              key={index}
              index={number}
              questions={q}
              handleIsActive={e => {
                console.log(e.target.value);
                //TODO dispatch 사용법.... 알기....
                //TODO dispatch로 e.target.value를 answer를 맵으로 선언해서 거기에 추가해주기...하...
                dispatch({ type: "append" });
                console.log("answer:", answer);
              }}
            />
          </div>
        ))}
    </div>
  );
}

export function PaginatedItems({ itemsPerPage, items }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
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
      <Items
        currentItems={currentItems}
        // number={items.indexOf(currentItems[1])}
        number={"인덱스"}
      />
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
      />
    </>
  );
}

export default PaginatedItems;
