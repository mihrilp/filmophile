const initialState = {
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  recentlyViewedMovies: [],
}

export default function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_POPULAR_MOVIES":
      return { ...state, popularMovies: action.payload };
    case "FETCH_TOP_RATED_MOVIES":
      return { ...state, topRatedMovies: action.payload };
    case "FETCH_UPCOMING_MOVIES":
      return { ...state, upcomingMovies: action.payload };
    case "ADD_RECENTLY_VIEWED_MOVIE":
      return { ...state, recentlyViewedMovies: [...state.recentlyViewedMovies, action.payload] };
    default:
      return state;
  }
}
