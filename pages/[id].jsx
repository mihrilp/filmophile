import React, { useCallback } from "react";
import axios from "axios";
import Image from "next/image";

export async function getStaticPaths() {
  const [popularMovies, topRatedMovies, upComingMovies] = await Promise.all([
    axios(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    ),
    axios(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    ),
    axios(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    ),
  ]);

  const paths = [
    ...popularMovies.data.results,
    ...topRatedMovies.data.results,
    ...upComingMovies.data.results,
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

function MovieDetail({ movie }) {
  console.log(movie);
  const formatDate = useCallback((date) => {
    date = date.split("-");
    return `${date[2]}.${date[1]}.${date[0]}`;
  }, []);

  return (
    <div className="movie">
      <div className="movie__details">
        <div className="movie__details__img">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="movie image"
            width={500}
            height={400}
          />
        </div>
        <div className="movie__details__info">
          <div className="movie__details__info__title">
            <h3>{movie.original_title}</h3>
            <p className="movie__details__info__title__score">
              {movie.vote_average.toFixed(1)}
            </p>
          </div>
          <div className="movie__details__info__date">
            {formatDate(movie.release_date)}
          </div>
          <div className="movie__details__info__overview">
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
      <div className="movie__moreDetail">
        <div>
          <h3>Production Companies: </h3>
          {movie.production_companies.map((company) => (
            <p key={company.id}>{company.name}</p>
          ))}
        </div>
        <div>
          <h3>Countries: </h3>
          {movie.production_countries.map((country) => (
            <p key={country.id}>{country.name}</p>
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
      <div className="movie__tagline">
        <h2>{movie.tagline.toUpperCase()}</h2>
      </div>
      <div className="movie__backdropImg">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt="movie image"
          width="100%"
          height="70%"
          layout="responsive"
          objectFit="contain"
        />
      </div>
    </div>
  );
}

export default MovieDetail;
