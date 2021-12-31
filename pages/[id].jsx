import React from "react";
import axios from "axios";
import Image from "next/image";

export async function getStaticPaths() {
  const [popularMovies, topRatedMovies] = await Promise.all([
    axios(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    ),
    axios(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    ),
  ]);

  const paths = [
    ...popularMovies.data.results,
    ...topRatedMovies.data.results,
  ].map((movie) => {
    return {
      params: {
        id: movie.id.toString(),
      },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  return { props: { movie: data } };
}

function formatDate(date) {
  date = date.split("-");
  return `${date[2]}.${date[1]}.${date[0]}`;
}

function MovieDetail({ movie }) {
  console.log(movie);
  return (
    <div className="movie">
      <div className="movie__img">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="movie image"
          width={500}
          height={400}
        />
      </div>
      <div className="movie__info">
        <div className="movie__info__title">
          <p>{movie.original_title}</p>
          <p className="movie__info__title__score">{movie.vote_average}</p>
        </div>
        <div className="movie__info__date">
          {formatDate(movie.release_date)}
        </div>
        <div className="movie__info__overview">
          <p>{movie.overview}</p>
        </div>
        <div className="movie__info__moreDetail">
          <div>
            <h3>Production Companies: </h3>
            {movie.production_companies.map((production_company) => (
              <p key={production_company.id}>{production_company.name}</p>
            ))}
          </div>
          <div>
            <h3>Genres: </h3>
            {movie.genres.map((genre) => (
              <p key={genre.id}> {genre.name} </p>
            ))}
          </div>
          <div>
            <h3>Spoken Languages: </h3>
            {movie.spoken_languages.map((lang) => (
              <p key={lang.id}> {lang.name} </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
