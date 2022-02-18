import axios from "axios";
import { Dispatch } from "redux";
import { ActionType, MoviesAction } from "../../types";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/",
  timeout: 1000,
});

export const changeModalVisibility = () => ({
  type: "CHANGE_MODAL_VISIBILITY",
});

export const addRecentlytViewedMovie = (movie: {}) => ({
  type: "ADD_RECENTLY_VIEWED_MOVIE",
  payload: movie,
});

export const fetchMovies = (keyword: string) => {
  let type = ActionType.POPULAR;
  switch (keyword) {
    case "popular":
      type = ActionType.POPULAR;
      break;
    case "top_rated":
      type = ActionType.TOP_RATED;
      break;
  }
  return (dispatch: Dispatch<MoviesAction>) => {
    instance
      .get(
        `${keyword}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
      )
      .then((res) => dispatch({ type: type, payload: res.data.results }))
      .catch((err) => console.log(err));
  };
};

export const fetchUpcomingMovie = () => {
  let upComingMovies = [];
  return (dispatch: Dispatch<MoviesAction>) => {
    instance
      .get(
        `upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        upComingMovies = res.data.results;
        dispatch({
          type: ActionType.UPCOMING,
          payload:
            upComingMovies?.[Math.floor(Math.random() * upComingMovies.length)],
        });
      })
      .catch((err) => console.log(err));
  };
};
