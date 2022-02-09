import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "../services/fetchMovies";
import Banner from "../components/banner";
import Pagination from "../components/pagination";
import { useSelector } from "react-redux";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const recentlyViewedMovies = useSelector((state) => state.movies.value);
  console.log(recentlyViewedMovies);

  useEffect(() => {
    (async () => {
      setPopularMovies(await fetchPopularMovies());
      setTopRatedMovies(await fetchTopRatedMovies());
    })();
  }, []);

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
        <div className="home__content">
          <Pagination title="Popular Movies" data={popularMovies} />
          <Pagination title="Top Rated Movies" data={topRatedMovies} />
          {recentlyViewedMovies.length > 0 && (
            <Pagination
              title="Recently Viewed Movies"
              data={recentlyViewedMovies}
            />
          )}
        </div>
      </main>
    </div>
  );
}
