import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  popularMovies: [],
  topRatedMovies: [],
  upComingMovie: {},
  recentlyViewedMovies: [],
}

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (keyword) => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${keyword}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`);
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
      return { ...state, recentlyViewedMovies: [...state.recentlyViewedMovies, payload] };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.popularMovies = action.payload;
    });
    builder.addCase(fetchUpcomingMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.upComingMovie = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const { addRecentlytViewedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
