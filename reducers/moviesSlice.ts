import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  popularMovies: [],
  topRatedMovies: [],
  upComingMovie: {},
  recentlyViewedMovies: [],
}

export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`);
    return data.results;
  })

export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRatedMovies',
  async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`);
    return data.results;
  })

export const fetchUpcomingMovie = createAsyncThunk(
  'movies/fetchUpcomingMovie',
  async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`);
    return data.results[Math.floor(Math.random() * data.results.length)];
  })

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addRecentlytViewedMovie: (state, { payload }) => {
      return { ...state, recentlyViewedMovies: [payload, ...state.recentlyViewedMovies] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPopularMovies.pending || fetchTopRatedMovies.pending || fetchUpcomingMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.popularMovies = action.payload;
    });
    builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.topRatedMovies = action.payload;
    });
    builder.addCase(fetchUpcomingMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.upComingMovie = action.payload;
    });
    builder.addCase(fetchPopularMovies.rejected || fetchTopRatedMovies.rejected || fetchUpcomingMovie.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const { addRecentlytViewedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
