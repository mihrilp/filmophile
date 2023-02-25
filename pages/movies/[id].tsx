import React, { useEffect, useState } from "react";
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
import { formatRuntime } from "@/utils";

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
  const [cast, setCast] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);

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
      setCast(data.cast);
      setDirectors(
        data.crew.filter((person: Person) => person.job === "Director")
      );
      setWriters(
        data.crew.filter(
          (person: Person) =>
            person.known_for_department === "Writing" && person.job !== "Writer"
        )
      );
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
      <div className="movie__info">
        <div className="movie__info__imgContainer">
          <Image
            className="movie__info__imgContainer__poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="movie image"
            layout="fill"
          />
        </div>
        <div className="movie__info__textContainer">
          <h3 className="movie__info__textContainer__title">
            {movie.original_title} ({movie.release_date.split("-")[0]})
          </h3>
          <div className="movie__info__textContainer__header">
            <p className="movie__info__textContainer__header__ratings">
              {movie.vote_average.toFixed(1)} / 10
            </p>
            <p>{formatRuntime(movie.runtime)} </p>
            <a
              className="movie__info__textContainer__header__trailerBtn"
              onClick={() => {
                dispatch(openModal());
              }}
            >
              <Play
                className="movie__info__textContainer__header__trailerBtn__icon"
                fill="#cb9e0c"
              />
              Play Trailer
            </a>
          </div>
          <div className="movie__info__textContainer__overview">
            <p>{movie.overview}</p>
          </div>

          {movie.tagline && (
            <div className="movie__info__textContainer__tagline">
              <q>{movie.tagline} </q>
            </div>
          )}

          <div className="movie__info__textContainer__details">
            <Info title="Genres:" content={movie.genres} />
            <Info title="Directors:" content={directors.slice(0, 4)} />
            <Info title="Writers:" content={writers.slice(0, 4)} />
            <Info title="Countries:" content={movie.production_countries} />
          </div>
        </div>
      </div>
      <h3 className="movie__subtitle">Top Cast</h3>
      <div className="movie__cast">
        {cast.slice(0, 7).map((person: Person) => (
          <div className="movie__cast__person" key={person.id}>
            <Person
              name={person.name}
              imgUrl={person.profile_path}
              character={person.character}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetail;
