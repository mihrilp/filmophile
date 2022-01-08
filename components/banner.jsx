import React, { useState, useEffect } from "react";
import axios from "axios";

function Slider() {
  const [upcomingMovie, setUpcomingMovie] = useState({});

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

  console.log(upcomingMovie);

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
            {upcomingMovie.vote_average.toFixed(1)}
          </p>
        </div>
        <p className="banner__content__overview">{upcomingMovie.overview}</p>
        <div className="banner__content__btns">
          <a className="banner__content__btns__watchTrailerBtn" href="#">
            Watch Trailer
          </a>
          <a className="banner__content__btns__seeDetailBtn" href="#">
            See Details
          </a>
        </div>
      </div>
    </div>
  );
}

export default Slider;
