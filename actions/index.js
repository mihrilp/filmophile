export const setModalVisibility = () => ({
  type: "CHANGE_MODAL_VISIBILITY",
});

export const addRecentlytViewedMovie = (movie) => ({
  type: "ADD_RECENTLY_VIEWED_MOVIE",
  payload: movie,
});
