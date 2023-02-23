import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Info, Person } from "@/components";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchTrendingMovies,
  fetchMovieDetail,
  fetchMovieVideos,
  fetchMovieCredits,
} from "../../api/fetchMovies";
import { useAppDispatch } from "@/hooks";
import { GetStaticPaths } from "next";
import { openModal, setVideoUrl } from "@/store/modal.slice";
import Head from "next/head";
import { Play } from "@/public/assets";
import { formatDate } from "@/utils";

type Params = {
  params: {
    id: string;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const [popularMovies, topRatedMovies, upComingMovies] = await Promise.all([
    fetchPopularMovies(),
    fetchTopRatedMovies(),
    fetchTrendingMovies(),
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
  const dispatch = useAppDispatch();
  const [credits, setCredits] = useState({
    cast: [],
    crew: [],
  });

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
    if (recentlyViewedMovies.length > 5) recentlyViewedMovies.pop();
    localStorage.setItem(
      "recentlyViewedMovies",
      JSON.stringify(recentlyViewedMovies)
    );
    (async () => {
      const videos = await fetchMovieVideos(movie.id);
      dispatch(
        setVideoUrl(
          videos.filter((video: any) => video.type === "Trailer")[0].key
        )
      );
      let data = await fetchMovieCredits(movie.id);
      console.log(data);
      setCredits(data);
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
        <div className="movie__imgContainer__img">
          <Image
            className="movie__imgContainer__img__poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="movie image"
            layout="fill"
          />
        </div>
        <p className="movie__imgContainer__score">
          <b> {movie.vote_average.toFixed(1)} </b>/ {movie.vote_count} Ratings
        </p>
      </div>
      <div className="movie__info">
        <h3 className="movie__info__title">{movie.original_title}</h3>
        <div className="movie__info__date">
          {formatDate(movie.release_date)}
        </div>
        <div className="movie__info__lineAndTrailerBtn">
          <a
            className="movie__info__lineAndTrailerBtn__trailerBtn"
            onClick={() => {
              dispatch(openModal());
            }}
          >
            <Play className="movie__info__lineAndTrailerBtn__trailerBtn__icon" />
            Watch Trailer
          </a>
        </div>
        <div className="movie__info__overview">
          <p>{movie.overview}</p>
        </div>
        {movie.tagline && (
          <div className="movie__info__lineAndTrailerBtn__line">
            <q>{movie.tagline}</q>
          </div>
        )}
        <h3 className="movie__info__subtitle">Details</h3>
        <div className="movie__info__details">
          <div>
            <Info title="Genres:" content={movie.genres} />
            <Info title="Runtime:" content={movie.runtime} />
          </div>
          <div>
            <Info title="Countries:" content={movie.production_countries} />
            <Info title="Languages:" content={movie.spoken_languages} />
          </div>
        </div>
        <h3 className="movie__info__subtitle">Cast & Crew</h3>
        <div className="movie__info__cast">
          {credits.cast.map((person) => (
            <Person name={person.name} imgUrl={person.profile_path} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
