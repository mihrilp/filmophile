import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, UPCOMING_MOVIES_ENDPOINT } from "@/api";
import { AxiosError } from "axios";

const initialState: MovieState = {
  loading: false,
  data: [],
  error: undefined
};

export const fetchUpcomingMovies = createAsyncThunk<Movie[], void, { rejectValue: KnownError }>(
  "movies/fetchUpcomingMovies",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        UPCOMING_MOVIES_ENDPOINT
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

export const upcomingMoviesSlice = createSlice({
  name: "upcomingMovies",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUpcomingMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUpcomingMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default upcomingMoviesSlice.reducer;
