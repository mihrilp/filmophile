import React from "react";
import axios from "axios";
import Image from "next/image";
import styles from "../styles/detail.module.scss";

export async function getStaticPaths() {
  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
  );
  const paths = data.results.map((movie) => {
    return {
      params: {
        id: movie.id.toString(),
      },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log(params.id);
  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  console.log(data);
  return { props: { movie: data } };
}

function MovieDetail({ movie }) {
  console.log(movie);
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{movie.original_title}</h2>
      <Image
        className={styles.image}
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt="movie image"
        width={500}
        height={400}
      />
      <div className={styles.scoreAndDate}>
        <p>{movie.release_date}</p>
        <p className={styles.score}>{movie.vote_average}</p>
      </div>
      <p className={styles.overview}>{movie.overview}</p>
      <div className={styles.moreInfo}>
        <div className="productionCompanies">
          <h3>Production Companies: </h3>
          <br />
          {movie.production_companies.map((production_company) => (
            <p key={production_company.id}>{production_company.name}</p>
          ))}
        </div>
        <div className={styles.genres}>
          <h3>Genres: </h3>
          <br />
          {movie.genres.map((genre) => (
            <p key={genre.id}> {genre.name} </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
