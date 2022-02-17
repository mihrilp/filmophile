
export default function recentlyMoviesReducer(state = [], action) {
  switch (action.type) {
    case "ADD_RECENTLY_VIEWED_MOVIE":
      return [...state, action.payload];
    default:
      return state;
  }
}
