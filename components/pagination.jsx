import React, { useState } from "react";
import Link from "next/link";
import Card from "../components/card";
import { RightArrow, LeftArrow } from "../public/assets";

const ITEMS_PER_PAGE = 10;

function Pagination({ title, data }) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="pagination">
      <h2 className="pagination__title">{title}</h2>
      <div className="pagination__data">
        {data.slice(indexOfFirstItem, indexOfLastItem).map((movie) => (
          <Link href={`/${movie.id}`} key={movie.id}>
            <a>
              <Card
                name={movie.original_title}
                imgUrl={movie.poster_path}
                date={movie.release_date}
                score={movie.vote_average.toFixed(1)}
              />
            </a>
          </Link>
        ))}
      </div>
      {data?.length > ITEMS_PER_PAGE && (
        <div className="pagination__btns">
          <button
            className="pagination__btns__prevBtn"
            disabled={indexOfFirstItem == 0}
            onClick={handlePrevBtn}
          >
            <LeftArrow />
          </button>
          <button
            className="pagination__btns__nextBtn"
            disabled={indexOfLastItem == data.length}
            onClick={handleNextBtn}
          >
            <RightArrow />
          </button>
        </div>
      )}
    </div>
  );
}

export default Pagination;
