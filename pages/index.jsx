import Head from "next/head";
import Link from "next/link";
import Card from "../components/card";
import axios from "axios";

export async function getStaticProps() {
  const { data: popularMovies } = await axios(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
  );

  const { data: topRatedMovies } = await axios(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
  );

  return {
    props: {
      popularMovies,
      topRatedMovies,
    },
  };
}

export default function Home({ popularMovies, topRatedMovies }) {
  return (
    <div className="home">
      <Head>
        <title>Fimophile</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <div className="home__jumbotron">
          <h3>Everything about movies...</h3>
          <br />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim sed
            atque officiis magni neque alias commodi deserunt laboriosam harum
            nemo perspiciatis temporibus eligendi autem reiciendis magnam vel
            quod, labore ipsum!
          </p>
        </div>
        <h2 className="home__title">Popular Movies</h2>
        <div className="home__section">
          {popularMovies.results.slice(0, 10).map((movie) => (
            <Link href={`/${movie.id}`} key={movie.id} passHref>
              <Card
                key={movie.id}
                name={movie.original_title}
                imgUrl={movie.poster_path}
                date={movie.release_date}
                score={movie.vote_average}
              />
            </Link>
          ))}
        </div>
        <h2 className="home__title">Top Rated Movies</h2>
        <div className="home__section">
          {topRatedMovies.results.slice(0, 10).map((movie) => (
            <Link href={`/${movie.id}`} key={movie.id} passHref>
              <Card
                name={movie.original_title}
                imgUrl={movie.poster_path}
                date={movie.release_date}
                score={movie.vote_average}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
