import Image from "next/image";
import styles from "../styles/card.module.scss";

function Card({ name, imgUrl, date, score }) {
  return (
    <div className={styles.card}>
      <Image
        className={styles.image}
        src={`https://image.tmdb.org/t/p/original${imgUrl}`}
        alt="movie image"
        width={300}
        height={400}
        layout="responsive"
      />
      <p>{name}</p>
      <p>{date}</p>
      <p>{score}</p>
    </div>
  );
}

export default Card;
