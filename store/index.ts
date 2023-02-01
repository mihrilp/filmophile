import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice";
import moviesReducer from "./moviesSlice";


export const store = configureStore({
  reducer: {
    modal: modalReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
