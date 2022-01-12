import React, { useState } from "react";
import Link from "next/link";
import Card from "../components/card";
import { RightArrow, LeftArrow } from "../public/assets";

function Pagination({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handleNextBtn = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevBtn = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="pagination">
      <div className="pagination__data">
        {data.slice(indexOfFirstItem, indexOfLastItem).map((movie) => (
          <Link href={`/${movie.id}`} key={movie.id} passHref>
            <Card
              name={movie.original_title}
              imgUrl={movie.poster_path}
              date={movie.release_date}
              score={movie.vote_average.toFixed(1)}
            />
          </Link>
        ))}
      </div>
      <div className="pagination__btns">
        <button
          className="pagination__btns__prevBtn"
          disabled={currentPage == 1}
          onClick={handlePrevBtn}
        >
          <LeftArrow />
        </button>
        <button className="pagination__btns__nextBtn" onClick={handleNextBtn}>
          <RightArrow />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
