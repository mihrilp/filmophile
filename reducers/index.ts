import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import moviesReducer from "./moviesReducer";
import movieDetailReducer from "./movieDetailReducer";

const rootReducer = combineReducers({
  modalVisibility: modalReducer,
  movies: moviesReducer,
  movieDetail: movieDetailReducer,
});

export default rootReducer;
