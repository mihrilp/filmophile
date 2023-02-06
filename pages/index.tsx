import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import {
  Pagination,
  Banner,
  LoadingSpinner,
  ErrorBoundary,
} from "../components";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchPopularMovies } from "../store/popularMovies.slice";
import { fetchTopRatedMovies } from "../store/topRatedMovies.slice";
import { fetchUpcomingMovies } from "../store/upcomingMovies.slice";

export default function Home() {
  const [recentlyViewedMovies, setRecentlyViewedMovies] = useState([]);
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

  const {
    data: upcomingMovies,
    loading: upcomingMoviesLoading,
    error: upcomingMoviesError,
  } = useAppSelector((state) => state.upcomingMovies);

  const randomUpcomingMovie = useMemo(
    () => upcomingMovies[Math.floor(Math.random() * upcomingMovies.length)],
    [upcomingMovies]
  );

  const loading = useMemo(
    () =>
      popularMoviesLoading || topRatedMoviesLoading || upcomingMoviesLoading,
    [popularMoviesLoading, topRatedMoviesLoading, upcomingMoviesLoading]
  );

  const error = useMemo(
    () => popularMoviesError || topRatedMoviesError || upcomingMoviesError,
    [popularMoviesError, topRatedMoviesError, upcomingMoviesError]
  );

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchUpcomingMovies());
    setRecentlyViewedMovies(
      JSON.parse(localStorage.getItem("recentlyViewedMovies")!)
    );
  }, []);

  return (
    <div className="home">
      <Head>
        <title>filmophile</title>
      </Head>
      <main className="home__content">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorBoundary {...error} />
        ) : (
          <>
            {randomUpcomingMovie && <Banner movie={randomUpcomingMovie} />}
            <div className="home__content__movies">
              <Pagination title="Popular Movies" data={popularMovies} />
              <Pagination title="Top Rated Movies" data={topRatedMovies} />
              {recentlyViewedMovies?.length > 0 && (
                <Pagination
                  recentlyViewed
                  title="Recently Viewed"
                  data={recentlyViewedMovies}
                />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
