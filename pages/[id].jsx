import React from "react";
import axios from "axios";
import Image from "next/image";

export async function getStaticPaths() {
  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
  );
  const paths = data.results.map((movie) => {
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

function MovieDetail({ movie }) {
  console.log(movie);
  return (
    <div>
      <h2>{movie.original_title}</h2>
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt="movie image"
        width={300}
        height={400}
        layout="responsive"
      />
      <p>{movie.overview}</p>
      <div className="genres">
        {movie.genres.map((genre) => (
          <p key={genre.id}>{genre.name}</p>
        ))}
      </div>
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt="movie image"
        width={300}
        height={400}
        layout="responsive"
      />
      <div className="productionCompanies">
        {movie.production_companies.map((production_company) => (
          <p key={production_company.id}>{production_company.name}</p>
        ))}
      </div>
      <p>{movie.release_dat}</p>
      <p>{movie.vote_average}</p>
    </div>
  );
}

export default MovieDetail;
