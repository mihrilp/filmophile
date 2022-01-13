import React, { useState, useEffect } from "react";
import Head from "next/head";
import Banner from "../components/banner";
import axios from "axios";
import Pagination from "../components/pagination";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    (async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
        )
        .then((res) => setPopularMovies(res.data.results))
        .catch((err) => console.log(err));

      await axios
        .get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
        )
        .then((res) => setTopRatedMovies(res.data.results))
        .catch((err) => console.log(err));
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
