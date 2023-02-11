import React, { useEffect, useMemo } from "react";
import Head from "next/head";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchPopularTvShows } from "@/store/tvShows/popularTvShows.slice";
import { ErrorBoundary, LoadingSpinner, Pagination } from "@/components";
import { fetchTopRatedTvShows } from "@/store/tvShows/topRatedTvShows.slice";

function TvShows() {
  const dispatch = useAppDispatch();

  const {
    data: popularTvShows,
    loading: popularTvShowsLoading,
    error: popularTvShowsError,
  } = useAppSelector((state) => state.popularTvShows);

  const {
    data: topRatedTvShows,
    loading: topRatedTvShowsLoading,
    error: topRatedTvShowsError,
  } = useAppSelector((state) => state.topRatedTvShows);

  const loading = useMemo(
    () => popularTvShowsLoading || topRatedTvShowsLoading,
    [popularTvShowsLoading, topRatedTvShowsLoading]
  );

  const error = useMemo(
    () => popularTvShowsError || topRatedTvShowsError,
    [popularTvShowsError, topRatedTvShowsError]
  );

  useEffect(() => {
    dispatch(fetchPopularTvShows());
    dispatch(fetchTopRatedTvShows());
  }, []);

  return (
    <div className="tvShows">
      <Head>
        <title>TV Shows</title>
      </Head>
      <main className="tvShows__content">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorBoundary {...error} />
        ) : (
          <>
            <Pagination title="Popular TV Shows" data={popularTvShows} />
            <Pagination title="Top Rated TV Shows" data={topRatedTvShows} />
          </>
        )}
      </main>
    </div>
  );
}

export default TvShows;
