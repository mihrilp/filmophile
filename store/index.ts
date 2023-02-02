import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import popularMoviesReducer from "./popularMovies.slice";
import topRatedMoviesReducer from "./topRatedMovies.slice";
import upcomingMoviesReducer from "./upcomingMovies.slice";
import searchResultsReducer from "./searchResults.slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    popularMovies: popularMoviesReducer,
    topRatedMovies: topRatedMoviesReducer,
    upcomingMovies: upcomingMoviesReducer,
    searchResults: searchResultsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
