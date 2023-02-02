import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, SEARCH_ENDPOINT } from "../api";
import { AxiosError } from "axios";

const initialState: MoviesState = {
  loading: false,
  data: [],
  error: null
};

export const fetchSearchResults = createAsyncThunk<Movie[], string, { rejectValue: KnownError }>(
  "movies/fetchSearchResults",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        SEARCH_ENDPOINT + query
      );
      return data.results;
    } catch (err: AxiosError<KnownError> | any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchResults.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchSearchResults.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default searchResultsSlice.reducer;
