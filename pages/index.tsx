import React, { useEffect } from "react";
import Head from "next/head";
import { Pagination, Banner } from "../components";
import { useAppSelector, useAppDispatch } from "../hooks";
import { fetchPopularMovies, fetchTopRatedMovies } from "../store/moviesSlice";

export default function Home() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector((state) => state.movies.loading);
  const popularMovies = useAppSelector((state) => state.movies.popularMovies);
  const topRatedMovies = useAppSelector((state) => state.movies.topRatedMovies);

  const recentlyViewedMovies = useAppSelector((state) =>
    state.movies.recentlyViewedMovies.slice(0, 5)
  );

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTopRatedMovies());
  }, []);

  return (
    <div className="home">
      <Head>
        <title>filmophile</title>
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
