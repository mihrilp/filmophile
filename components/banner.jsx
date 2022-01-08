import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

function Slider() {
  const [upcomingMovie, setUpcomingMovie] = useState({});
  const [videoUrl, setVideoUrl] = useState();

  useEffect(() => {
    (async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        )
        .then((res) =>
          setUpcomingMovie(
            res.data.results[
              Math.floor(Math.random() * res.data.results.length)
            ]
          )
        )
        .catch((err) => console.log(err));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .get(
          `https://api.themoviedb.org/3/movie/${upcomingMovie.id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        )
        .then((res) => setVideoUrl(res.data.results[0].key))
        .catch((err) => console.log(err));
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
          <p className="banner__content__score">{upcomingMovie.vote_average}</p>
        </div>
        <p className="banner__content__overview">{upcomingMovie.overview}</p>
        <div className="banner__content__btns">
          <a
            className="banner__content__btns__watchTrailerBtn"
            href={`https://www.youtube.com/watch?v=${videoUrl}`}
          >
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
