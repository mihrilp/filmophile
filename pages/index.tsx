import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Pagination, Banner } from "../components";
//import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../hooks";
//import { fetchMovies } from "../store/actions";
// import {
//   fetchPopularMovies,
//   fetchTopRatedMovies,
// } from "../services/fetchMovies";
import { fetchPopularMovies, fetchTopRatedMovies } from "../store/moviesSlice";
//import { RootState } from "../store/reducers";

export default function Home() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.movies.loading);
  const popularMovies = useAppSelector((state) => state.movies.popularMovies);
  const topRatedMovies = useAppSelector((state) => state.movies.topRatedMovies);

  const recentlyViewedMovies = useAppSelector((state) =>
    state.movies.recentlyViewedMovies.slice(0, 5)
  );
  //const dispatch = useDispatch();

  //const loading = useSelector((state: RootState) => state.movies.loading);
  //const loading = useState(false);
  // const popularMovies = useSelector(
  //   (state: RootState) => state.movies.popularMovies
  // );
  // const topRatedMovies = useSelector(
  //   (state: RootState) => state.movies.topRatedMovies
  // );

  // const recentlyViewedMovies = useSelector((state: RootState) =>
  //   state.movies.recentlyViewedMovies.slice(0, 5)
  // );

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
    // dispatch(fetchMovies("popular"));
    // dispatch(fetchMovies("top_rated"));
  }, [dispatch]);
  return (
    <div className="home">
      <Head>
        <title>filmophile</title>
        <link
          rel="icon"
          type="image/svg+xml"
          sizes="32x32"
          href="/favicon.svg"
        />
      </Head>
      <main>
        <Banner />
        {!loading && (
          <div className="home__content">
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
        )}
      </main>
    </div>
  );
}
