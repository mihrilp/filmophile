import React, { useCallback } from "react";
import Image from "next/image";

const Card = ({ name, imgUrl, date, score }) => {
  const formatDate = useCallback((date) => {
    date = date.split("-");
    return `${date[2]}.${date[1]}.${date[0]}`;
  }, []);

  return (
    <div className="card">
      <div className="card__imgContainer">
        <Image
          className="card__imgContainer__image"
          src={`https://image.tmdb.org/t/p/w500${imgUrl}`}
          alt="movie image"
          layout="fill"
        />
      </div>
      <div className="card__title">
        <p className="card__title__name">{name}</p>
      </div>
      <div className="card__info">
        <p className="card__info__date">{formatDate(date)}</p>
        <p className="card__info__score">{score}</p>
      </div>
    </div>
  );
};

export default Card;
