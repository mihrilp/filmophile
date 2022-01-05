import React, { useCallback } from "react";
import Image from "next/image";

const Card = React.forwardRef(({ name, imgUrl, date, score, href }, ref) => {
  const formatDate = useCallback((date) => {
    date = date.split("-");
    return `${date[2]}.${date[1]}.${date[0]}`;
  }, []);

  return (
    <a href={href} ref={ref} className="card">
      <Image
        className="card__image"
        src={`https://image.tmdb.org/t/p/original${imgUrl}`}
        alt="movie image"
        width={300}
        height={400}
        layout="responsive"
      />
      <div className="card__title">
        <p>{name}</p>
      </div>
      <div className="card__info">
        <p className="card__info__date">{formatDate(date)}</p>
        <p className="card__info__score">{score}</p>
      </div>
    </a>
  );
});

export default Card;
