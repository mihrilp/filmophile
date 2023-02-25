import React, { useEffect } from "react";
import Link from "next/link";
import { Play } from "@/public/assets";
import { fetchMovieVideos } from "@/api/fetchMovies";
import { fetchTvShowVideos } from "@/api/fetchTvShows";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { openModal, setVideoUrl } from "@/store/modal.slice";

function Banner() {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.banner.data);

  useEffect(() => {
    data.id &&
      (async () => {
        const videos = data.original_name
          ? await fetchTvShowVideos(data.id)
          : await fetchMovieVideos(data.id);
        dispatch(
          setVideoUrl(
            videos.filter((video: any) => video.type === "Trailer")[0]?.key
          )
        );
      })();
  }, [data.id]);

  return (
    <div className="banner">
      {data.backdrop_path && (
        <div
          className="banner__bg"
          style={{
            backgroundImage: `url(${`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`})`,
          }}
        ></div>
      )}
      <div className="banner__content">
        <div>
          <p className="banner__content__title">
            {data.original_title
              ? data.original_title?.toUpperCase()
              : data.original_name?.toUpperCase()}
          </p>
          <p className="banner__content__score">
            {data.vote_average?.toFixed(1)}
          </p>
        </div>
        <p className="banner__content__overview">{data.overview}</p>
        <div className="banner__content__btns">
          <a
            className="banner__content__btns__watchTrailerBtn"
            onClick={() => {
              dispatch(openModal());
            }}
          >
            <Play
              className="banner__content__btns__watchTrailerBtn__icon"
              fill="#fff"
            />
            Watch Trailer
          </a>
          <Link
            href={
              data.original_title
                ? `/movies/${data.id}`
                : `/tv-shows/${data.id}`
            }
          >
            <a className="banner__content__btns__seeDetailBtn">See Details</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Banner;
