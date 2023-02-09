import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, TRENDING_MOVIES_ENDPOINT } from "@/api";
import { AxiosError } from "axios";

const initialState: MoviesState = {
  loading: false,
  data: [],
  error: undefined,
};

export const fetchTrendingMovies= createAsyncThunk<Movie[], void, { rejectValue: KnownError }>(
  "trending/fetchTrendingMovies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        TRENDING_MOVIES_ENDPOINT
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

export const trendingMoviesSlice = createSlice({
  name: "trendingMovies",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrendingMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTrendingMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTrendingMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default trendingMoviesSlice.reducer;
