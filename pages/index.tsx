import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import {
  Pagination,
  Banner,
  LoadingSpinner,
  ErrorBoundary,
} from "@/components";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { fetchTrendingMovies } from "@/store/movies/trendingMovies.slice";
import { fetchTrendingTvShows } from "@/store/tvShows/trendingTvShows.slice";
import { setBannerData } from "@/store/banner.slice";

export default function Home() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
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

  const randomMedia = useMemo(
    () =>
      [...trendingMovies, ...trendingTvShows][
        Math.floor(
          Math.random() * [...trendingMovies, ...trendingTvShows].length
        )
      ],
    [trendingMovies, trendingTvShows]
  );

  const loading = useMemo(
    () => trendingMoviesLoading || trendingTvShowsLoading,
    [trendingMoviesLoading, trendingTvShowsLoading]
  );

  const error = useMemo(
    () => trendingMoviesError || trendingTvShowsError,
    [trendingMoviesError, trendingTvShowsError]
  );

  useEffect(() => {
    dispatch(fetchTrendingMovies());
    dispatch(fetchTrendingTvShows());
    setRecentlyViewed(JSON.parse(localStorage.getItem("recentlyViewed")!));
  }, []);

  useEffect(() => {
    randomMedia && dispatch(setBannerData(randomMedia));
  }, [randomMedia]);

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
            {randomMedia && <Banner />}
            <div className="home__content__lists">
              <h2 className="home__content__lists__title">
                What&apos;s Trending This Week
              </h2>
              <Pagination title="Trending Movies" data={trendingMovies} />
              <Pagination title="Trending TV Shows" data={trendingTvShows} />
              {recentlyViewed?.length > 0 && (
                <Pagination title="Recently Viewed" data={recentlyViewed} />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
