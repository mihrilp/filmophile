import React from "react";
import { useAppSelector } from "../hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, LoadingSpinner } from "../components";

function Search() {
  const { loading, data } = useAppSelector((state) => state.searchResults);
  const router = useRouter();

  return (
    <div className="searchResults">
      {loading ? (
        <LoadingSpinner />
      ) : data.length > 0 ? (
        <>
          <p className="searchResults__title">
            Search Results for &quot;{router.query.q}&quot;
          </p>
          <div className="searchResults__data">
            {data.map((movie) => (
              <Link href={`/${movie.id}`} key={movie.id}>
                <a className="pagination__data__link">
                  <Card
                    name={movie.original_title}
                    imgUrl={movie.poster_path}
                    date={movie.release_date}
                    score={movie.vote_average?.toFixed(1)}
                  />
                </a>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="searchResults__noResults">
          <p className="searchResults__noResults__title">No results</p>
          <p className="searchResults__noResults__text">
            Nothing found about &quot;{router.query.q}&quot;
          </p>
        </div>
      )}
    </div>
  );
}

export default Search;
