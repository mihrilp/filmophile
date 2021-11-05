import Image from "next/image";
import styles from "../styles/card.module.scss";

function Card({ name, imgUrl, date, score }) {
  return (
    <div className={styles.card}>
      <Image
        src={`https://image.tmdb.org/t/p/original${imgUrl}`}
        width={300}
        height={300}
        layout="responsive"
      />
      <p>{name}</p>
      <p>{date}</p>
      <p>{score}</p>
    </div>
  );
}

export default Card;
