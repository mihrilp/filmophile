import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import Info from "../components/info";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchMovieVideoUrl,
  fetchMovieDetail,
} from "../services/fetchMovies";

export async function getStaticPaths() {
  const [popularMovies, topRatedMovies, upComingMovies] = await Promise.all([
    fetchPopularMovies(),
    fetchTopRatedMovies(),
    fetchUpcomingMovies(),
  ]);

  const paths = [...popularMovies, ...topRatedMovies, ...upComingMovies].map(
    (movie) => {
      return {
        params: {
          id: movie.id.toString(),
        },
      };
    }
  );
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const data = await fetchMovieDetail(params.id);
  return { props: { movie: data } };
}

function MovieDetail({ movie }) {
  const [videoUrl, setVideoUrl] = useState();
  const formatDate = useCallback((date) => {
    date = date.split("-");
    return `${date[2]}.${date[1]}.${date[0]}`;
  }, []);

  useEffect(() => {
    (async () => {
      setVideoUrl(await fetchMovieVideoUrl(movie.id));
    })();
  }, [movie.id]);

  console.log(movie);
  return (
    <div className="movie">
      <div
        className="movie__bg"
        style={{
          backgroundImage: `url(${`https://image.tmdb.org/t/p/original${movie.backdrop_path}`})`,
        }}
      ></div>
      <div className="movie__poster">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt="movie image"
          layout="fill"
        />
      </div>
      <div className="movie__info">
        <div className="movie__info__title">
          <h3>{movie.original_title}</h3>
          <p className="movie__info__title__score">
            {movie.vote_average.toFixed(1)}
          </p>
        </div>
        <div className="movie__info__date">
          {formatDate(movie.release_date)}
        </div>
        <div className="movie__info__overview">
          <p>{movie.overview}</p>
        </div>
        <div className="movie__info__tagline">
          <q>{movie.tagline}</q>
        </div>
        <div className="movie__info__moreInfo">
          <Info title="Genres:" arr={movie.genres} />
          <Info title="Languages:" arr={movie.spoken_languages} />
          <Info title="Countries:" arr={movie.production_countries} />
          <Info title="Companies:" arr={movie.production_companies} />
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
