import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { Info } from "../components";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchMovieDetail,
  fetchMovieVideoUrl,
} from "../services/fetchMovies";
import { useAppDispatch } from "../hooks";
import { GetStaticPaths } from "next";
import { openModal, setVideoUrl } from "../store/modalSlice";
import Head from "next/head";

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

function MovieDetail({ movie }: { movie: Movie }) {
  const formatDate = useCallback((date) => {
    date = date.split("-");
    return `${date[2]}.${date[1]}.${date[0]}`;
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let recentlyViewedMovies =
      JSON.parse(localStorage.getItem("recentlyViewedMovies")!) || [];
    if (recentlyViewedMovies.length === 0) {
      recentlyViewedMovies.push(movie);
    } else {
      recentlyViewedMovies.every((item: Movie) => {
        return item.id !== movie.id;
      }) && recentlyViewedMovies.unshift(movie);
    }
    if (recentlyViewedMovies.length > 6) recentlyViewedMovies.pop();
    localStorage.setItem(
      "recentlyViewedMovies",
      JSON.stringify(recentlyViewedMovies)
    );
    (async () => {
      const videoUrl = await fetchMovieVideoUrl(movie.id);
      dispatch(setVideoUrl(videoUrl));
    })();
  }, [movie]);

  return (
    <div className="movie">
      <Head>
        <title>{movie.original_title}</title>
      </Head>
      {movie.backdrop_path && (
        <div
          className="movie__bg"
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`})`,
          }}
        ></div>
      )}
      <div className="movie__imgContainer">
        <Image
          className="movie__imgContainer__poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="movie image"
          layout="fill"
        />
      </div>
      <div className="movie__info">
        <div className="movie__info__header">
          <div className="movie__info__header__title">
            <h3>
              {movie.original_title}
              <span className="movie__info__header__title__score">
                {movie.vote_average.toFixed(1)}
              </span>
            </h3>
          </div>
          <a
            className="movie__info__header__watchTrailerBtn"
            onClick={() => {
              dispatch(openModal());
            }}
          >
            Watch Trailer
          </a>
        </div>
        <div className="movie__info__date">
          {formatDate(movie.release_date)}
        </div>
        <div className="movie__info__overview">
          <p>{movie.overview}</p>
          {movie.tagline && (
            <div className="movie__info__overview__tagline">
              <q>{movie.tagline}</q>
            </div>
          )}
        </div>
        <div className="movie__info__moreInfo">
          <Info title="Genres:" arr={movie.genres} />
          <Info title="Countries:" arr={movie.production_countries} />
          <Info title="Languages:" arr={movie.spoken_languages} />
          <Info title="Companies:" arr={movie.production_companies} />
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
