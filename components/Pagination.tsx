import React, { useState } from "react";
import Link from "next/link";
import { Card } from ".";
import { RightArrow, LeftArrow } from "../public/assets";

const ITEMS_PER_PAGE = 12;

interface PaginationProps {
  title: string;
  data: Array<{
    id: number;
    original_title?: string;
    original_name?: string;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
  }>;
  recentlyViewed?: boolean;
}

function Pagination({ title, data, recentlyViewed }: PaginationProps) {
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
      <div
        className={`pagination__data ${
          recentlyViewed && "pagination__recentlyViewed"
        }`}
      >
        {data?.slice(indexOfFirstItem, indexOfLastItem).map((item) => (
          <Link href={`/${item.id}`} key={item.id}>
            <a className="pagination__data__link">
              <Card
                name={item.original_title || item.original_name}
                imgUrl={item.poster_path}
                date={item.release_date || item.first_air_date}
                score={item.vote_average?.toFixed(1)}
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
            disabled={indexOfLastItem >= data.length}
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
