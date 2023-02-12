import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal.slice";
import trendingMoviesReducer from "./movies/trendingMovies.slice";
import trendingTvShowsReducer from "./tvShows/trendingTvShows.slice";
import popularMoviesReducer from "./movies/popularMovies.slice";
import topRatedMoviesReducer from "./movies/topRatedMovies.slice";
import popularTvShowsSlice from "./tvShows/popularTvShows.slice";
import topRatedTvShowsReducer from "./tvShows/topRatedTvShows.slice";
import searchResultsReducer from "./searchResults.slice";
import bannerReducer from "./banner.slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    trendingMovies: trendingMoviesReducer,
    trendingTvShows: trendingTvShowsReducer,
    popularMovies: popularMoviesReducer,
    topRatedMovies: topRatedMoviesReducer,
    searchResults: searchResultsReducer,
    popularTvShows: popularTvShowsSlice,
    topRatedTvShows: topRatedTvShowsReducer,
    banner: bannerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
