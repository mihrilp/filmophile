import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, ErrorBoundary, LoadingSpinner } from "../components";
import { fetchSearchResults } from "../store/searchResults.slice";

function Search() {
  const { loading, data, error } = useAppSelector(
    (state) => state.searchResults
  );
  const { query } = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSearchResults(query.q as string));
  }, [query.q]);

  return (
    <div className="searchResults">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorBoundary {...error} />
      ) : data.length > 0 ? (
        <>
          <p className="searchResults__title">
            Search Results for &quot;{query.q}&quot;
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
            Nothing found about &quot;{query.q}&quot;
          </p>
        </div>
      )}
    </div>
  );
}

export default Search;
