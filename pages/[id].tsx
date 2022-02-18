import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { Info } from "../components";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchMovieDetail,
} from "../services/fetchMovies";
import { useDispatch } from "react-redux";
//import { addRecentlytViewedMovie } from "../reducers/moviesSlice";
import { addRecentlytViewedMovie } from "../store/actions";
import { GetStaticPaths } from "next";

type Params = {
  params: {
    id: string;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
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
};

export const getStaticProps = async ({ params }: Params) => {
  const data = await fetchMovieDetail(params.id);
  return { props: { movie: data } };
};

interface MovieProps {
  movie: {
    id: number;
    backdrop_path: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    tagline?: string;
    genres: [];
    spoken_languages: [];
    production_countries: [];
    production_companies: [];
  };
}

function MovieDetail({ movie }: MovieProps) {
  const formatDate = useCallback((date) => {
    date = date.split("-");
    return `${date[2]}.${date[1]}.${date[0]}`;
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addRecentlytViewedMovie(movie));
  }, [movie, dispatch]);

  return (
    <div className="movie">
      <div
        className="movie__bg"
        style={{
          backgroundImage: `url(${`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`})`,
        }}
      ></div>
      <div className="movie__imgContainer">
        <Image
          className="movie__imgContainer__poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
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
        {movie.tagline && (
          <div className="movie__info__tagline">
            <q>{movie.tagline}</q>
          </div>
        )}
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
