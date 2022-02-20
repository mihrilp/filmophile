import ActionType from "../../types/actionTypes";
interface MoviesState {
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  upComingMovie: Movie;
  recentlyViewedMovies: Movie[];
}

const initialState = {
  popularMovies: [],
  topRatedMovies: [],
  upComingMovie: {
    id: 0,
    original_title: "",
    poster_path: "",
    release_date: "",
    vote_average: 0,
  },
  recentlyViewedMovies: [],
};

export default function moviesReducer(
  state: MoviesState = initialState,
  action: MoviesAction
) {
  switch (action.type) {
    case ActionType.POPULAR:
      return { ...state, popularMovies: action.payload };
    case ActionType.TOP_RATED:
      return { ...state, topRatedMovies: action.payload };
    case ActionType.UPCOMING:
      return { ...state, upComingMovie: action.payload };
    case ActionType.RECENTLY_VIEWED:
      return {
        ...state,
        recentlyViewedMovies: [action.payload, ...state.recentlyViewedMovies],
      };
    default:
      return state;
  }
}
