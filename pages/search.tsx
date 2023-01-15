import React from "react";
import { useAppSelector } from "../hooks";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card } from "../components";

function Search() {
  const searchResult = useAppSelector((state) => state.movies.searchResults);
  const router = useRouter();
  console.log(searchResult);
  return (
    <div className="searchResults">
      {searchResult.length > 0 ? (
        <>
          <p className="searchResults__title">
            Search Results for &quot;{router.query.q}&quot;
          </p>
          <div className="searchResults__data">
            {searchResult.map((movie) => (
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
        <div>No results found</div>
      )}
    </div>
  );
}

export default Search;
