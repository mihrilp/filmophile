import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Info } from "@/components";
import { useAppDispatch } from "@/hooks";
import { GetStaticPaths } from "next";
import { openModal, setVideoUrl } from "@/store/modal.slice";
import Head from "next/head";
import {
  fetchPopularTvShows,
  fetchTopRatedTvShows,
  fetchTrendingTvShows,
  fetchTvShowDetail,
  fetchTvShowVideos,
} from "@/api/fetchTvShows";
import { formatRuntime } from "@/utils";
import { Play } from "@/public/assets";

type Params = {
  params: {
    id: string;
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const [popularTvShows, topRatedTvShows] = await Promise.all([
    fetchPopularTvShows(),
    fetchTopRatedTvShows(),
    fetchTrendingTvShows(),
  ]);

  const paths = [...popularTvShows, ...topRatedTvShows].map((tvShow) => {
    return {
      params: {
        id: tvShow.id.toString(),
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    let recentlyViewedtvShows =
      JSON.parse(localStorage.getItem("recentlyViewedtvShows")!) || [];
    if (recentlyViewedtvShows.length === 0) {
      recentlyViewedtvShows.push(tvShow);
    } else {
      recentlyViewedtvShows.every((item: TvShow) => {
        return item.id !== tvShow.id;
      }) && recentlyViewedtvShows.unshift(tvShow);
    }
    if (recentlyViewedtvShows.length > 5) recentlyViewedtvShows.pop();
    localStorage.setItem(
      "recentlyViewedtvShows",
      JSON.stringify(recentlyViewedtvShows)
    );
    (async () => {
      const videos = await fetchTvShowVideos(tvShow.id);
      dispatch(
        setVideoUrl(
          videos.filter((video: any) => video.type === "Trailer")[0]?.key
        )
      );
    })();
  }, [tvShow]);

  return (
    <div className="tvShow">
      <Head>
        <title>{tvShow.original_name}</title>
      </Head>
      {tvShow.backdrop_path && (
        <div
          className="tvShow__bg"
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path}`})`,
          }}
        ></div>
      )}
      <div className="tvShow__info">
        <div className="tvShow__info__imgContainer">
          <Image
            className="tvShow__info__imgContainer__poster"
            src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
            alt="tvShow image"
            layout="fill"
          />
        </div>
        <div className="tvShow__info__textContainer">
          <h3 className="tvShow__info__textContainer__title">
            {tvShow.original_name} ({tvShow.first_air_date.split("-")[0]} -{" "}
            {tvShow.status !== "Ended"
              ? ""
              : tvShow.last_air_date.split("-")[0]}
            )
          </h3>
          <div className="tvShow__info__textContainer__header">
            <p className="tvShow__info__textContainer__header__ratings">
              {tvShow.vote_average.toFixed(1)} / 10
            </p>
            <p>{formatRuntime(tvShow.episode_run_time[0])} </p>
            <a
              className="tvShow__info__textContainer__header__trailerBtn"
              onClick={() => {
                dispatch(openModal());
              }}
            >
              <Play
                className="tvShow__info__textContainer__header__trailerBtn__icon"
                fill="#cb9e0c"
              />
              Play Trailer
            </a>
          </div>
          <div className="tvShow__info__textContainer__overview">
            <p>{tvShow.overview}</p>
          </div>

          {tvShow.tagline && (
            <div className="tvShow__info__textContainer__tagline">
              <q>{tvShow.tagline} </q>
            </div>
          )}

          <div className="tvShow__info__textContainer__details">
            <Info title="Genres:" content={tvShow.genres} />
            <Info title="Countries:" content={tvShow.production_countries} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TvShowDetail;
