import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import moviesReducer from "./moviesReducer";

const rootReducer = combineReducers({
  modalVisibility: modalReducer,
  movies: moviesReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
