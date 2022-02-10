import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Play } from "../public/assets";
import {
  fetchUpcomingMovies,
  fetchMovieVideoUrl,
} from "../services/fetchMovies";
import ModalVideo from "./modal";
import { useSelector, useDispatch } from "react-redux";
//import { changeModalVisibility } from "../actions";
import { changeModalVisibility } from "../reducers/modalSlice";

function Banner() {
  const [upcomingMovie, setUpcomingMovie] = useState({});
  const [videoUrl, setVideoUrl] = useState();

  const modalVisibility = useSelector((state) => state.modalVisibility);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const movie = await fetchUpcomingMovies();
      setUpcomingMovie(movie?.[Math.floor(Math.random() * movie.length)]);
    })();
  }, []);

  useEffect(() => {
    upcomingMovie.id &&
      (async () => {
        setVideoUrl(await fetchMovieVideoUrl(upcomingMovie.id));
      })();
  }, [upcomingMovie.id]);

  return (
    <div className="banner">
      <div
        className="banner__bg"
        style={{
          backgroundImage: `url(${`https://image.tmdb.org/t/p/w1280${upcomingMovie.backdrop_path}`})`,
        }}
      ></div>
      <div className="banner__content">
        <div>
          <p className="banner__content__title">
            {upcomingMovie.original_title?.toUpperCase()}
          </p>
          <p className="banner__content__score">
            {upcomingMovie.vote_average?.toFixed(1)}
          </p>
        </div>
        <p className="banner__content__overview">{upcomingMovie.overview}</p>
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
          <Link href={`/${upcomingMovie.id}`}>
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
  );
}

export default Banner;
