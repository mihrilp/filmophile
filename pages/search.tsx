import React, { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, ErrorBoundary, LoadingSpinner, Person } from "../components";
import { fetchSearchResults } from "../store/searchResults.slice";
import { filterSearchResults } from "../utils";

function Search() {
  const { loading, data, error } = useAppSelector(
    (state) => state.searchResults
  );
  const { query } = useRouter();
  const dispatch = useAppDispatch();

  const people = useMemo(() => filterSearchResults(data, "person"), [data]);
  const movies = useMemo(() => filterSearchResults(data, "movie"), [data]);
  const tvShows = useMemo(() => filterSearchResults(data, "tv"), [data]);

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
          <div className="searchResults__content">
            {people.length > 0 && (
              <>
                <p className="searchResults__content__title">People</p>
                <div className="searchResults__content__data">
                  {people.map((person) => (
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
            {movies.length > 0 && (
              <>
                <p className="searchResults__content__title">Movies</p>
                <div className="searchResults__content__data">
                  {movies.map((movie) => (
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
            {tvShows.length > 0 && (
              <>
                <p className="searchResults__content__title">TV Shows</p>
                <div className="searchResults__content__data">
                  {tvShows.map((tvShow) => (
                    <Link href={`/${tvShow.id}`} key={tvShow.id}>
                      <a className="pagination__data__link">
                        <Card
                          name={tvShow.original_name}
                          imgUrl={tvShow.poster_path}
                          date={tvShow.first_air_date}
                          score={tvShow.vote_average?.toFixed(1)}
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
