import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Card from "../components/card";
import Slider from "../components/banner";
import axios from "axios";

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
        <div className="home__banner">
          <Slider />
        </div>
        <h2 className="home__title">Popular Movies</h2>
        <div className="home__section">
          {popularMovies.slice(0, 10).map((movie) => (
            <Link href={`/${movie.id}`} key={movie.id} passHref>
              <Card
                name={movie.original_title}
                imgUrl={movie.poster_path}
                date={movie.release_date}
                score={movie.vote_average.toFixed(1)}
              />
            </Link>
          ))}
        </div>
        <h2 className="home__title">Top Rated Movies</h2>
        <div className="home__section">
          {topRatedMovies.slice(0, 10).map((movie) => (
            <Link href={`/${movie.id}`} key={movie.id} passHref>
              <Card
                name={movie.original_title}
                imgUrl={movie.poster_path}
                date={movie.release_date}
                score={movie.vote_average}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
