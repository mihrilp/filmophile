import React from "react";
import Image from "next/image";
import { Star } from "../public/assets";

function formatDate(date: string) {
  console.log(date);
  const dateArr: string[] = date.split("-");
  return `${dateArr[2]}.${dateArr[1]}.${dateArr[0]}`;
}

const Card = ({ name, imgUrl, date, score }: CardProps) => {
  return (
    <div className="card">
      <div className="card__imgContainer">
        <Image
          className="card__imgContainer__poster"
          src={`https://image.tmdb.org/t/p/w500${imgUrl}`}
          alt="movie image"
          layout="fill"
        />
      </div>
      <div className="card__info">
        <p className="card__info__score">
          <Star style={{ marginRight: 5 }} />
          {score}
        </p>
        <p className="card__info__date">
          {date ? formatDate(date) : "Unknown"}
        </p>
      </div>
      <div className="card__title">
        <p className="card__title__name">{name}</p>
      </div>
    </div>
  );
};

export default Card;
