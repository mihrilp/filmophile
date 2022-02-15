import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/",
  timeout: 1000,
});

export const changeModalVisibility = () => ({
  type: "CHANGE_MODAL_VISIBILITY",
});

export const addRecentlytViewedMovie = (movie) => ({
  type: "ADD_RECENTLY_VIEWED_MOVIE",
  payload: movie,
});


export const fetchMovies = (keyword) => {
  let type;
  switch (keyword) {
    case "popular":
      type = "FETCH_POPULAR_MOVIES";
      break;
    case "top_rated":
      type = "FETCH_TOP_RATED_MOVIES";
      break;
    case "upcoming":
      type = "FETCH_UPCOMING_MOVIES";
      break;
  }
  return (dispatch) => {
    instance.get(
      `${keyword}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    ).then(res => dispatch({ type: type, payload: res.data.results }))
      .catch(err => console.log(err));
  }
}

export const fetchUpcomingMovie = () => {
  let upComingMovies = []
  return (dispatch) => {
    instance.get(`upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`).
      then(res => {
        upComingMovies = res.data.results
        dispatch({ type: "FETCH_UPCOMING_MOVIE", payload: upComingMovies?.[Math.floor(Math.random() * upComingMovies.length)] })
      })
      .catch(err => console.log(err));
  }
}

export const fetchMovieDetail = (id) => {
  return (dispatch) => {
    instance.get(
      `${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    ).then(res => dispatch({ type: "FETCH_MOVIE_DETAIL", payload: res.data }))
      .catch(err => console.log(err));
  }
}


