import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, TRENDING_TV_SHOWS_ENDPOINT } from "../../api";
import { AxiosError } from "axios";

const initialState: MoviesState = {
  loading: false,
  data: [],
  error: undefined,
};

export const fetchTrendingTvShows= createAsyncThunk<Movie[], void, { rejectValue: KnownError }>(
  "trending/fetchTrendingTvShows",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        TRENDING_TV_SHOWS_ENDPOINT
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

export const trendingTvShowsSlice = createSlice({
  name: "trendingTvShows",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrendingTvShows.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTrendingTvShows.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTrendingTvShows.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default trendingTvShowsSlice.reducer;
