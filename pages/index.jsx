import Head from "next/head";
import styles from "../styles/home.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";
import Card from "../components/card";
import axios from "axios";

export async function getStaticProps() {
  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  );
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const movies = data.results;
  return (
    <div className={styles.container}>
      <Head>
        <title>Fimophile</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <main>
        <div className={styles.jumbotron}>
          <h3>Everything about movies...</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim sed
            atque officiis magni neque alias commodi deserunt laboriosam harum
            nemo perspiciatis temporibus eligendi autem reiciendis magnam vel
            quod, labore ipsum!
          </p>
        </div>
        <h2 className={styles.title}>Popular Movies</h2>
        <div className={styles.movies}>
          {movies.slice(0, 10).map((movie) => (
            <Card
              key={movie.id}
              name={movie.original_title}
              imgUrl={movie.poster_path}
              date={movie.release_date}
            />
          ))}
        </div>
        <h2 className={styles.title}>Top Rated Movies</h2>
      </main>
      <Footer />
    </div>
  );
}
