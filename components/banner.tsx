import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Play } from "../public/assets";
import { fetchMovieVideoUrl } from "../services/fetchMovies";
import ModalVideo from "./modal";
//import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../hooks";
// import {
//   changeModalVisibility,
//   fetchMovies,
//   fetchUpcomingMovie,
// } from "../store/actions";
import { openModal, setVideoUrl } from "../store/modalSlice";
import { fetchUpcomingMovie } from "../store/moviesSlice";
//import { RootState } from "../store/reducers";

function Banner() {
  const upComingMovie = useAppSelector((state) => state.movies.upComingMovie);
  const modalVisibility = useAppSelector((state) => state.modal.visibility);
  const dispatch = useAppDispatch();

  // const upComingMovie = useSelector(
  //   (state: RootState) => state.movies.upComingMovie
  // );
  // const modalVisibility = useSelector(
  //   (state: RootState) => state.modalVisibility
  // );
  // const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUpcomingMovie());
  }, [dispatch]);

  useEffect(() => {
    upComingMovie.id &&
      (async () => {
        const videoUrl = await fetchMovieVideoUrl(upComingMovie.id);
        dispatch(setVideoUrl(videoUrl));
      })();
  }, [upComingMovie.id]);

  return (
    upComingMovie && (
      <div className="banner">
        {upComingMovie.backdrop_path && (
          <div
            className="banner__bg"
            style={{
              backgroundImage: `url(${`https://image.tmdb.org/t/p/w1280${upComingMovie.backdrop_path}`})`,
            }}
          ></div>
        )}
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
                dispatch(openModal());
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
      </div>
    )
  );
}

export default Banner;
