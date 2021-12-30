import React from "react";
import axios from "axios";
import Image from "next/image";

export async function getStaticPaths() {
  const [popularMovies, topRatedMovies] = await Promise.all([
    axios(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    ),
    axios(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    ),
  ]);

  const paths = [
    ...popularMovies.data.results,
    ...topRatedMovies.data.results,
  ].map((movie) => {
    return {
      params: {
        id: movie.id.toString(),
      },
    };
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log(params.id);
  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
  );
  console.log(data);
  return { props: { movie: data } };
}

function formatDate(date) {
  date = date.split("-");
  return `${date[2]}.${date[1]}.${date[0]}`;
}

function MovieDetail({ movie }) {
  return (
    <div className="movie">
      <p className="movie__title">{movie.original_title}</p>
      <Image
        className="movie__img"
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt="movie image"
        width={500}
        height={400}
      />
      <div className="movie__info">
        <p>{formatDate(movie.release_date)}</p>
        <p className="movie__info__score">{movie.vote_average}</p>
      </div>
      <p className="movie__overview">{movie.overview}</p>
      <div className="movie__moreInfo">
        <div className="movie__productionCompanies">
          <h3>Production Companies: </h3>
          <br />
          {movie.production_companies.map((production_company) => (
            <p key={production_company.id}>{production_company.name}</p>
          ))}
        </div>
        <div className="movie__genres">
          <h3>Genres: </h3>
          <br />
          {movie.genres.map((genre) => (
            <p key={genre.id}> {genre.name} </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
