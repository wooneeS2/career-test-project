import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import QuestionList from "../style_components/CustomQuestions";
import {
  PageButton,
  NextBtnWithoutLink,
} from "../style_components/CustomButtons";
import "../style_components/pagination.css";

// 테스트 문항을 5개씩 나눠서 보여주는 페이지네이션 컴포넌트
export function PaginatedItems({ itemsPerPage, items, questionIndex }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [newAnswr, setNewAnswr] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
    endOffset === pageCount * itemsPerPage ? setIsEnd(true) : setIsEnd(false);
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % items.length;

    setItemOffset(newOffset);
  };

  // 문항과 답을 하나씩 만들어주는 컴포넌트
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

                    return temp;
                  });
                }}
              />
            </div>
          ))}
      </div>
    );
  };

  let history = useHistory();
  //history를 통해 정답을 보내기 전에 응답 받은 항목들의 중복 제거하기
  function deduplication(arr) {
    let arrLen = arr
      .slice()
      .reverse()
      .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
      .reverse()
      .sort(function (a, b) {
        return a.id - b.id;
      }).length;
    return arrLen;
  }
  function handleClick() {
    if (deduplication(newAnswr) < 28) {
      {
        alert("모든 문항에 답변을 체크해주세요");
        return;
      }
    } else {
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
  }

  return (
    <>
      <Items currentItems={currentItems} number={questionIndex} />
      {/* TODO 응답 배열의 개수 == endOffset이면 버튼 활성화 */}

      <ReactPaginate
        nextLabel={<PageButton title="다음" disabled={true} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<PageButton title="이전" disabled={true} />}
        containerClassName="pagination"
        renderOnZeroPageCount={null}
        pageClassName="numbering"
      />

      {/* TODO 응답 배열의 개수 !== 전체 문항의 개수 경고문 표시하고 링크 작동 X */}

      {isEnd ? (
        <NextBtnWithoutLink title={"검사 완료"} onClick={handleClick} />
      ) : null}
    </>
  );
}

export default PaginatedItems;
