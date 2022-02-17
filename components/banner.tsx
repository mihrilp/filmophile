import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Play } from "../public/assets";
import {
  fetchUpcomingMovies,
  fetchMovieVideoUrl,
} from "../services/fetchMovies";
import ModalVideo from "./modal";
import { useSelector, useDispatch } from "react-redux";
// import {
//   changeModalVisibility,
//   fetchMovies,
//   fetchUpcomingMovie,
// } from "../actions";
import { changeModalVisibility } from "../reducers/modalSlice";
import { fetchUpcomingMovie } from "../reducers/moviesSlice";

function Banner() {
  const [videoUrl, setVideoUrl] = useState();

  const upComingMovie = useSelector((state) => state.movies.upComingMovie);
  const modalVisibility = useSelector((state) => state.modalVisibility);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUpcomingMovie());
  }, [dispatch]);

  useEffect(() => {
    upComingMovie.id &&
      (async () => {
        setVideoUrl(await fetchMovieVideoUrl(upComingMovie.id));
      })();
  }, [upComingMovie.id]);

  return (
    upComingMovie && (
      <div className="banner">
        <div
          className="banner__bg"
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/w1280${upComingMovie.backdrop_path}`})`,
          }}
        ></div>
        <div className="banner__content">
          <div>
            <p className="banner__content__title">
              {upComingMovie.original_title?.toUpperCase()}
            </p>
            <p className="banner__content__score">
              {upComingMovie.vote_average?.toFixed(1)}
            </p>
          </div>
          <p className="banner__content__overview">{upComingMovie.overview}</p>
          <div className="banner__content__btns">
            <a
              className="banner__content__btns__watchTrailerBtn"
              onClick={() => {
                dispatch(changeModalVisibility());
              }}
            >
              <Play className="banner__content__btns__watchTrailerBtn__icon" />
              Watch Trailer
            </a>
            <Link href={`/${upComingMovie.id}`}>
              <a className="banner__content__btns__seeDetailBtn">See Details</a>
            </Link>
          </div>
        </div>
        {modalVisibility && (
          <ModalVideo
            videoUrl={videoUrl}
            handleClick={() => dispatch(changeModalVisibility())}
          />
        )}
      </div>
    )
  );
}

export default Banner;
