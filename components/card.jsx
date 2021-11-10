import React from "react";
import Image from "next/image";
import styles from "../styles/card.module.scss";

const Card = React.forwardRef(({ name, imgUrl, date, score, href }, ref) => {
  return (
    <a href={href} ref={ref} className={styles.card}>
      <Image
        className={styles.image}
        src={`https://image.tmdb.org/t/p/original${imgUrl}`}
        alt="movie image"
        width={300}
        height={400}
        layout="responsive"
      />
      <div className={styles.title}>
        <p>{name}</p>
      </div>
      <div className={styles.scoreAndDate}>
        <p className={styles.date}>{date}</p>
        <p className={styles.score}>{score}</p>
      </div>
    </a>
  );
});

export default Card;
