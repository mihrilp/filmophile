import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Play } from "../public/assets";
import {
  fetchUpcomingMovies,
  fetchMovieVideoUrl,
} from "../services/fetchMovies";

function Slider() {
  const [upcomingMovie, setUpcomingMovie] = useState({});
  const [videoUrl, setVideoUrl] = useState();

  useEffect(() => {
    (async () => {
      const movie = await fetchUpcomingMovies();
      setUpcomingMovie(movie[Math.floor(Math.random() * movie.length)]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setVideoUrl(await fetchMovieVideoUrl(upcomingMovie.id));
    })();
  }, [upcomingMovie.id]);

  return (
    <div className="banner">
      <div
        className="banner__bg"
        style={{
          backgroundImage: `url(${`https://image.tmdb.org/t/p/original${upcomingMovie.backdrop_path}`})`,
        }}
      ></div>
      <div className="banner__content">
        <div>
          <p className="banner__content__title">
            {upcomingMovie.original_title}
          </p>
          {upcomingMovie.vote_average && (
            <p className="banner__content__score">
              {upcomingMovie.vote_average.toFixed(1)}
            </p>
          )}
        </div>
        <p className="banner__content__overview">{upcomingMovie.overview}</p>
        <div className="banner__content__btns">
          <a
            className="banner__content__btns__watchTrailerBtn"
            href={`https://www.youtube.com/watch?v=${videoUrl}`}
          >
            <Play style={{ marginRight: 10 }} />
            Watch Trailer
          </a>
          <Link href={`/${upcomingMovie.id}`}>
            <a className="banner__content__btns__seeDetailBtn">See Details</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Slider;
