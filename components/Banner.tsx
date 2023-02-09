import React, { useEffect } from "react";
import Link from "next/link";
import { Play } from "@/public/assets";
import { fetchMovieVideoUrl } from "@/api/fetchMovies";
import { useAppDispatch } from "@/hooks";
import { openModal, setVideoUrl } from "@/store/modalSlice";

function Banner({ movie }: { movie: Movie }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    movie.id &&
      (async () => {
        const videoUrl = await fetchMovieVideoUrl(movie.id);
        dispatch(setVideoUrl(videoUrl));
      })();
  }, [movie.id]);

  return (
    <div className="banner">
      {movie.backdrop_path && (
        <div
          className="banner__bg"
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`})`,
          }}
        ></div>
      )}
      <div className="banner__content">
        <div>
          <p className="banner__content__title">
            {movie.original_title?.toUpperCase()}
          </p>
          <p className="banner__content__score">
            {movie.vote_average?.toFixed(1)}
          </p>
        </div>
        <p className="banner__content__overview">{movie.overview}</p>
        <div className="banner__content__btns">
          <a
            className="banner__content__btns__watchTrailerBtn"
            onClick={() => {
              dispatch(openModal());
            }}
          >
            <Play className="banner__content__btns__watchTrailerBtn__icon" />
            Watch Trailer
          </a>
          <Link href={`/${movie.id}`}>
            <a className="banner__content__btns__seeDetailBtn">See Details</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
