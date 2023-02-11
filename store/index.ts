import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import trendingMoviesReducer from "./movies/trendingMovies.slice";
import trendingTvShowsReducer from "./tvShows/trendingTvShows.slice";
import popularMoviesReducer from "./movies/popularMovies.slice";
import topRatedMoviesReducer from "./movies/topRatedMovies.slice";
import upcomingMoviesReducer from "./movies/upcomingMovies.slice";
import popularTvShowsSlice from "./tvShows/popularTvShows.slice";
import topRatedTvShowsReducer from "./tvShows/topRatedTvShows.slice";
import searchResultsReducer from "./searchResults.slice";


export const store = configureStore({
  reducer: {
    modal: modalReducer,
    trendingMovies: trendingMoviesReducer,
    trendingTvShows: trendingTvShowsReducer,
    popularMovies: popularMoviesReducer,
    topRatedMovies: topRatedMoviesReducer,
    upcomingMovies: upcomingMoviesReducer,
    searchResults: searchResultsReducer,
    popularTvShows: popularTvShowsSlice,
    topRatedTvShows: topRatedTvShowsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
