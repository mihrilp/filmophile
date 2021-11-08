import { useState } from "react";
import Head from "next/head";
import styles from "../styles/home.module.scss";
import Card from "../components/card";
import axios from "axios";

export async function getStaticProps() {
  let res = await axios(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
  const popularMovies = res.data.results;
  res = await axios(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
  const topRatedMovies = res.data.results;

  return {
    props: {
      popularMovies,
      topRatedMovies,
    },
  };
}

export default function Home({ popularMovies, topRatedMovies }) {
  return (
    <div className={styles.home}>
      <Head>
        <title>Fimophile</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <div className={styles.jumbotron}>
          <h3>Everything about movies...</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim sed
            atque officiis magni neque alias commodi deserunt laboriosam harum
            nemo perspiciatis temporibus eligendi autem reiciendis magnam vel
            quod, labore ipsum!
          </p>
        </div>
        <h2 className={styles.title}>Popular Movies</h2>
        <div className={styles.movies}>
          {popularMovies.slice(0, 10).map((movie) => (
            <Card
              key={movie.id}
              name={movie.original_title}
              imgUrl={movie.poster_path}
              date={movie.release_date}
              score={movie.vote_average}
            />
          ))}
        </div>
        <h2 className={styles.title}>Top Rated Movies</h2>
        <div className={styles.movies}>
          {topRatedMovies.slice(0, 10).map((movie) => (
            <Card
              key={movie.id}
              name={movie.original_title}
              imgUrl={movie.poster_path}
              date={movie.release_date}
              score={movie.vote_average}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
