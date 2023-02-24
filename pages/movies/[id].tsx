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
  const [cast, setCast] = useState([]);

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
              {movie.vote_average.toFixed(1)} / 10 &nbsp; &nbsp;
              {movie.vote_count} Ratings
            </p>
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
          <div className="movie__info__textContainer__details">
            <Info title="Genres:" content={movie.genres} />
            <Info title="Runtime:" content={movie.runtime} />
            {movie.tagline && <Info title="Tagline:" content={movie.tagline} />}
            <Info title="Countries:" content={movie.production_countries} />
          </div>
        </div>
      </div>
      <h3 className="movie__subtitle">Top Cast</h3>
      <div className="movie__cast">
        {cast.slice(0, 8).map((person: CreditProps) => (
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
