import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Play } from "../public/assets";
import {
  fetchUpcomingMovies,
  fetchMovieVideoUrl,
} from "../services/fetchMovies";
import Popup from "./popup";

function Slider() {
  const [upcomingMovie, setUpcomingMovie] = useState({});
  const [videoUrl, setVideoUrl] = useState();
  const [trigger, setTrigger] = useState(false);

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
          <p className="banner__content__score">
            {upcomingMovie.vote_average?.toFixed(1)}
          </p>
        </div>
        <p className="banner__content__overview">{upcomingMovie.overview}</p>
        <div className="banner__content__btns">
          <a
            className="banner__content__btns__watchTrailerBtn"
            onClick={() => setTrigger(true)}
          >
            <Play style={{ marginRight: 10 }} />
            Watch Trailer
          </a>
          <Link href={`/${upcomingMovie.id}`}>
            <a className="banner__content__btns__seeDetailBtn">See Details</a>
          </Link>
        </div>
      </div>
      {trigger && (
        <Popup
          videoUrl={`https://www.youtube.com/embed/${videoUrl}?autoplay=1`}
          handleClick={() => setTrigger(false)}
        />
      )}
    </div>
  );
}

export default Slider;
