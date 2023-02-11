import React, { useEffect, useMemo } from "react";
import Head from "next/head";
import { Pagination, LoadingSpinner, ErrorBoundary } from "@/components";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { fetchPopularMovies } from "@/store/movies/popularMovies.slice";
import { fetchTopRatedMovies } from "@/store/movies/topRatedMovies.slice";

export default function Movies() {
  const dispatch = useAppDispatch();

  const {
    data: popularMovies,
    loading: popularMoviesLoading,
    error: popularMoviesError,
  } = useAppSelector((state) => state.popularMovies);

  const {
    data: topRatedMovies,
    loading: topRatedMoviesLoading,
    error: topRatedMoviesError,
  } = useAppSelector((state) => state.topRatedMovies);

  const loading = useMemo(
    () => popularMoviesLoading || topRatedMoviesLoading,
    [popularMoviesLoading, topRatedMoviesLoading]
  );

  const error = useMemo(
    () => popularMoviesError || topRatedMoviesError,
    [popularMoviesError, topRatedMoviesError]
  );

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
  }, []);

  return (
    <div className="movies">
      <Head>
        <title>Movies</title>
      </Head>
      <main className="movies__content">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorBoundary {...error} />
        ) : (
          <>
            <Pagination title="Popular Movies" data={popularMovies} />
            <Pagination title="Top Rated Movies" data={topRatedMovies} />
          </>
        )}
      </main>
    </div>
  );
}
