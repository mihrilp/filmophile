import React, { useCallback, useEffect } from "react";
import Image from "next/image";
import { Info } from "@/components";
import { useAppDispatch } from "@/hooks";
import { GetStaticPaths } from "next";
import { openModal, setVideoUrl } from "@/store/modalSlice";
import Head from "next/head";
import {
  fetchPopularTvShows,
  fetchTopRatedTvShows,
  fetchTvShowDetail,
  fetchTvShowVideos,
} from "@/api/fetchTvShows";

type Params = {
  params: {
    id: string;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const [popularTvShows, topRatedTvShows] = await Promise.all([
    fetchPopularTvShows(),
    fetchTopRatedTvShows(),
  ]);

  const paths = [...popularTvShows, ...topRatedTvShows].map((movie) => {
    return {
      params: {
        id: movie.id.toString(),
      },
    };
  });
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }: Params) => {
  const data = await fetchTvShowDetail(params.id);
  return { props: { tvShow: data } };
};

function TvShowDetail({ tvShow }: { tvShow: TvShow }) {
  const formatDate = useCallback((date) => {
    date = date.split("-");
    return `${date[2]}.${date[1]}.${date[0]}`;
  }, []);

  const dispatch = useAppDispatch();

  useEffect(() => {
    let recentlyViewedMovies =
      JSON.parse(localStorage.getItem("recentlyViewedMovies")!) || [];
    if (recentlyViewedMovies.length === 0) {
      recentlyViewedMovies.push(tvShow);
    } else {
      recentlyViewedMovies.every((item: Movie) => {
        return item.id !== tvShow.id;
      }) && recentlyViewedMovies.unshift(tvShow);
    }
    if (recentlyViewedMovies.length > 5) recentlyViewedMovies.pop();
    localStorage.setItem(
      "recentlyViewedMovies",
      JSON.stringify(recentlyViewedMovies)
    );
    (async () => {
      const videos = await fetchTvShowVideos(tvShow.id);
      dispatch(
        setVideoUrl(
          videos.filter((video: any) => video.type === "Trailer")[0].key
        )
      );
    })();
  }, [tvShow]);

  return (
    <div className="movie">
      <Head>
        <title>{tvShow.original_name}</title>
      </Head>
      {tvShow.backdrop_path && (
        <div
          className="movie__bg"
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path}`})`,
          }}
        ></div>
      )}
      <div className="movie__imgContainer">
        <Image
          className="movie__imgContainer__poster"
          src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
          alt="movie image"
          layout="fill"
        />
      </div>
      <div className="movie__info">
        <div className="movie__info__header">
          <div className="movie__info__header__title">
            <h3>
              {tvShow.original_name}
              <span className="movie__info__header__title__score">
                {tvShow.vote_average.toFixed(1)}
              </span>
            </h3>
          </div>
          <a
            className="movie__info__header__watchTrailerBtn"
            onClick={() => {
              dispatch(openModal());
            }}
          >
            Watch Trailer
          </a>
        </div>
        <div className="movie__info__date">
          {formatDate(tvShow.first_air_date)}
        </div>
        <div className="movie__info__overview">
          <p>{tvShow.overview}</p>
          {tvShow.tagline && (
            <div className="movie__info__overview__tagline">
              <q>{tvShow.tagline}</q>
            </div>
          )}
        </div>
        <div className="movie__info__moreInfo">
          <Info title="Genres:" arr={tvShow.genres} />
          <Info title="Countries:" arr={tvShow.production_countries} />
          <Info title="Languages:" arr={tvShow.spoken_languages} />
          <Info
            title="Companies:"
            arr={tvShow.production_companies.slice(0, 10)}
          />
        </div>
      </div>
    </div>
  );
}

export default TvShowDetail;
