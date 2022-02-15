import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalSlice";
import moviesReducer from "./reducers/moviesSlice";

export const store = configureStore({
  reducer: {
    modalVisibility: modalReducer,
    movies: moviesReducer,
  },
});