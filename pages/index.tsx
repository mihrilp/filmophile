import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Pagination, Banner, LoadingSpinner } from "../components";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchPopularMovies } from "../store/popularMovies.slice";
import { fetchTopRatedMovies } from "../store/topRatedMovies.slice";
import { fetchUpcomingMovies } from "../store/upcomingMovies.slice";

export default function Home() {
  const [recentlyViewedMovies, setRecentlyViewedMovies] = useState([]);

  const dispatch = useAppDispatch();

  const { data: popularMovies, loading: popularMoviesLoading } = useAppSelector(
    (state) => state.popularMovies
  );
  const { data: topRatedMovies, loading: topRatedMoviesLoading } =
    useAppSelector((state) => state.topRatedMovies);

  const { data: upcomingMovies, loading: upcomingMoviesLoading } =
    useAppSelector((state) => state.upcomingMovies);

  const randomUpcomingMovie = useMemo(
    () => upcomingMovies[Math.floor(Math.random() * upcomingMovies.length)],
    [upcomingMovies]
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
        {popularMoviesLoading ||
        topRatedMoviesLoading ||
        upcomingMoviesLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {randomUpcomingMovie && <Banner movie={randomUpcomingMovie} />}
            <div className="home__content__movies">
              <Pagination title="Popular Movies" data={popularMovies} />
              <Pagination title="Top Rated Movies" data={topRatedMovies} />
              {recentlyViewedMovies?.length > 0 && (
                <Pagination
                  recentlyViewed
                  title="Recently Viewed Movies"
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
