import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
} from "../services/fetchMovies";
import Banner from "../components/banner";
import Pagination from "../components/pagination";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

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
        <link rel="icon" type="image/x-icon" href="../public/favicon.svg" />
      </Head>
      <main>
        <Banner />
        <div className="home__content">
          <Pagination title="Popular Movies" data={popularMovies} />
          <Pagination title="Top Rated Movies" data={topRatedMovies} />
        </div>
      </main>
    </div>
  );
}
