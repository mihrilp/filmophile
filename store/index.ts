import { createStore, applyMiddleware } from "redux";
//import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
//import modalReducer from "./modalSlice";
//import moviesReducer from "./moviesSlice";

export const store = createStore(rootReducer, applyMiddleware(thunk));

// export const store = configureStore({
//   reducer: {
//     modalVisibility: modalReducer,
//     movies: moviesReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
