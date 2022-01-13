import React, { useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import Info from "../components/info";

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
  const formatDate = useCallback((date) => {
    date = date.split("-");
    return `${date[2]}.${date[1]}.${date[0]}`;
  }, []);

  console.log(movie);
  return (
    <div className="movie">
      <div
        className="movie__bg"
        style={{
          backgroundImage: `url(${`https://image.tmdb.org/t/p/original${movie.backdrop_path}`})`,
        }}
      ></div>
      <div className="movie__details">
        <div className="movie__details__img">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="movie image"
            layout="fill"
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
          <div className="movie__details__info__moreInfo">
            <Info title="Languages:" arr={movie.spoken_languages} />
            <Info title="Genres:" arr={movie.genres} />
            <Info title="Countries:" arr={movie.production_countries} />
            <Info title="Companies:" arr={movie.production_companies} />
          </div>
        </div>
      </div>

      <div className="movie__tagline">
        <h2>{movie.tagline}</h2>
      </div>
    </div>
  );
}

export default MovieDetail;
