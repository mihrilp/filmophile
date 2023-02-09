import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import {
  Pagination,
  Banner,
  LoadingSpinner,
  ErrorBoundary,
  Footer,
} from "@/components";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { fetchTrendingMovies } from "@/store/movies/trendingMovies.slice";
import { fetchTrendingTvShows } from "@/store/tvShows/trendingTvShows.slice";
import { fetchUpcomingMovies } from "@/store/movies/upcomingMovies.slice";

export default function Home() {
  const [recentlyViewedMovies, setRecentlyViewedMovies] = useState([]);
  const dispatch = useAppDispatch();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useAppSelector((state) => state.trendingMovies);

  const {
    data: trendingTvShows,
    loading: trendingTvShowsLoading,
    error: trendingTvShowsError,
  } = useAppSelector((state) => state.trendingTvShows);

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
      trendingMoviesLoading || trendingTvShowsLoading || upcomingMoviesLoading,
    [trendingMoviesLoading, trendingTvShowsLoading, upcomingMoviesLoading]
  );

  const error = useMemo(
    () => trendingMoviesError || trendingTvShowsError || upcomingMoviesError,
    [trendingMoviesError, trendingTvShowsError, upcomingMoviesError]
  );

  useEffect(() => {
    dispatch(fetchTrendingMovies());
    dispatch(fetchTrendingTvShows());
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
            <div className="home__content__lists">
              <h2 className="home__content__lists__title">
                What&apos;s Trending This Week
              </h2>
              <Pagination title="Trending Movies" data={trendingMovies} />
              <Pagination title="Trending TV Shows" data={trendingTvShows} />
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
      {randomUpcomingMovie && (
        <Footer movieId={randomUpcomingMovie?.id.toString()} />
      )}
    </div>
  );
}
