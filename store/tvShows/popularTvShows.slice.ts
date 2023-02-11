import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, POPULAR_TV_SHOWS_ENDPOINT} from "@/api";
import { AxiosError } from "axios";

const initialState: ApiState = {
  loading: false,
  data: [],
  error: undefined,
};

export const fetchPopularTvShows = createAsyncThunk<TvShow[], void, { rejectValue: KnownError }>(
  "tvShows/fetchPopularTvShows",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        POPULAR_TV_SHOWS_ENDPOINT
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

export const popularTvShowsSlice = createSlice({
  name: "popularTvShows",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPopularTvShows.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPopularTvShows.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchPopularTvShows.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default popularTvShowsSlice.reducer;
