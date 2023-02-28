import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Card } from ".";
import { RightArrow, LeftArrow } from "@/public/assets";

const ITEMS_PER_PAGE = 10;

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
    media_type: string;
  }>;
}

function Pagination({ title, data }: PaginationProps) {
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
      <div className="pagination__header">
        <h2 className="pagination__header__title">{title}</h2>
        {data?.length >= 20 && (
          <div className="pagination__header__btns">
            <button disabled={indexOfFirstItem == 0} onClick={handlePrevBtn}>
              <LeftArrow />
            </button>
            <button
              disabled={indexOfLastItem >= data.length}
              onClick={handleNextBtn}
            >
              <RightArrow />
            </button>
          </div>
        )}
      </div>
      <div className="pagination__data">
        {data?.slice(indexOfFirstItem, indexOfLastItem).map((item) => (
          <Link
            href={
              item.original_title
                ? `/movies/${item.id}`
                : `/tv-shows/${item.id}`
            }
            key={item.id}
          >
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
    </div>
  );
}

export default Pagination;
