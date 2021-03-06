import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
interface Movie {
  id: number;
  original_title: string;
  backdrop_path?: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview?: string;
  tagline?: string | undefined;
  genres?: [];
  spoken_languages?: [];
  production_countries?: [];
  production_companies?: [];
}
interface MoviesState {
  loading: boolean;
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  upComingMovie: Movie;
  recentlyViewedMovies: Movie[];
}

const initialState: MoviesState = {
  loading: false,
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

export const fetchPopularMovies = createAsyncThunk(
  "movies/fetchPopularMovies",
  async () => {
    let data: Movie[] = [];
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
      )
      .then((res) => {
        data = res.data.results;
      })
      .catch((err) => {
        console.log(err);
        () => toast(err);
      });
    return data;
  }
);

export const fetchTopRatedMovies = createAsyncThunk(
  "movies/fetchTopRatedMovies",
  async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    );
    return data.results;
  }
);

export const fetchUpcomingMovie = createAsyncThunk(
  "movies/fetchUpcomingMovie",
  async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    );
    return data.results[Math.floor(Math.random() * data.results.length)];
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addRecentlytViewedMovie: (state, action: PayloadAction<Movie>) => {
      return state.recentlyViewedMovies.some(
        (item) => item.id === action.payload.id
      )
        ? state
        : {
            ...state,
            recentlyViewedMovies: [
              action.payload,
              ...state.recentlyViewedMovies,
            ],
          };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPopularMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.popularMovies = action.payload;
    });
    builder.addCase(fetchPopularMovies.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchTopRatedMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.topRatedMovies = action.payload;
    });
    builder.addCase(fetchTopRatedMovies.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchUpcomingMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUpcomingMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.upComingMovie = action.payload;
    });
    builder.addCase(fetchUpcomingMovie.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { addRecentlytViewedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
