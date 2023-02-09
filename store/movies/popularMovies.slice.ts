import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, POPULAR_MOVIES_ENDPOINT } from "../../api";
import { AxiosError } from "axios";

const initialState: MoviesState = {
  loading: false,
  data: [],
  error: undefined,
};

export const fetchPopularMovies = createAsyncThunk<Movie[], void, { rejectValue: KnownError }>(
  "movies/fetchPopularMovies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        POPULAR_MOVIES_ENDPOINT
      );
      return data.results;
    } catch (err: AxiosError<KnownError> | any) {
      return rejectWithValue({
        code: err.response?.status,
        message: err.response?.data.status_message,
      });
    }
  }
);

export const popularMoviesSlice = createSlice({
  name: "popularMovies",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPopularMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchPopularMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default popularMoviesSlice.reducer;
