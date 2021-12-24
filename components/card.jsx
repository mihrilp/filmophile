import React from "react";
import Image from "next/image";

function formatDate(date) {
  date = date.split("-");
  return `${date[2]}.${date[1]}.${date[0]}`;
}

const Card = React.forwardRef(({ name, imgUrl, date, score, href }, ref) => {
  return (
    <a href={href} ref={ref} className="card">
      <Image
        className="image"
        src={`https://image.tmdb.org/t/p/original${imgUrl}`}
        alt="movie image"
        width={300}
        height={400}
        layout="responsive"
      />
      <div className="title">
        <p>{name}</p>
      </div>
      <div className="scoreAndDate">
        <p className="date">{formatDate(date)}</p>
        <div className="score">
          <p>{score}</p>
        </div>
      </div>
    </a>
  );
});

export default Card;
