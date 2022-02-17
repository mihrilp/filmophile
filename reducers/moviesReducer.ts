const initialState = {
  popularMovies: [],
  topRatedMovies: [],
  upComingMovie: {},
  recentlyViewedMovies: [],
}

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_POPULAR_MOVIES":
      return { ...state, popularMovies: action.payload };
    case "FETCH_TOP_RATED_MOVIES":
      return { ...state, topRatedMovies: action.payload };
    case "FETCH_UPCOMING_MOVIE":
      return { ...state, upComingMovie: action.payload };
    case "ADD_RECENTLY_VIEWED_MOVIE":
      return { ...state, recentlyViewedMovies: [action.payload, ...state.recentlyViewedMovies] };
    default:
      return state;
  }
}
