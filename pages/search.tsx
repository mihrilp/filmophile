import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Card,
  ErrorBoundary,
  LoadingSpinner,
  Pagination,
  Person,
} from "../components";
import { fetchSearchResults } from "../store/searchResults.slice";

function Search() {
  const { loading, data, error } = useAppSelector(
    (state) => state.searchResults
  );
  const { query } = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSearchResults(query.q as string));

    console.log(data);
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
          <div className="searchResults__content">
            {data.filter((item) => item.media_type === "person").length > 0 && (
              <>
                <p className="searchResults__content__title">People</p>
                <div className="searchResults__content__data">
                  {data
                    .filter((item) => item.media_type === "person")
                    .map((person) => (
                      <Link href={`/${person.id}`} key={person.id}>
                        <a className="searchResults__content__data__link">
                          <Person
                            imgUrl={person.profile_path}
                            name={person.name}
                            department={person.known_for_department}
                          />
                        </a>
                      </Link>
                    ))}
                </div>
              </>
            )}
            {data.filter((item) => item.media_type === "movie").length > 0 && (
              <>
                <p className="searchResults__content__title">Movies</p>
                <div className="searchResults__content__data">
                  {data
                    .filter((item) => item.media_type === "movie")
                    .map((movie) => (
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
            )}
            {data.filter((item) => item.media_type === "tv").length > 0 && (
              <>
                <p className="searchResults__content__title">TV Shows</p>
                <div className="searchResults__content__data">
                  {data
                    .filter((item) => item.media_type === "tv")
                    .map((movie) => (
                      <Link href={`/${movie.id}`} key={movie.id}>
                        <a className="pagination__data__link">
                          <Card
                            name={movie.original_name}
                            imgUrl={movie.poster_path}
                            date={movie.first_air_date}
                            score={movie.vote_average?.toFixed(1)}
                          />
                        </a>
                      </Link>
                    ))}
                </div>
              </>
            )}
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
