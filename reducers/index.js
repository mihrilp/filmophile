import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import moviesReducer from "./moviesReducer";

const rootReducer = combineReducers({
  modalVisibility: modalReducer,
  recentlyViewedMovies: moviesReducer,
});

export default rootReducer;
