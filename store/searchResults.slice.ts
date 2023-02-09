import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, SEARCH_ENDPOINT } from "@/api";
import { AxiosError } from "axios";

type SearchType = Movie[] & Person[] & TvShow[];

type SearchState = {
  loading: boolean;
  data: SearchType;
  error: KnownError | undefined;
}

const initialState: SearchState = {
  loading: false,
  data: [],
  error: undefined
};

export const fetchSearchResults = createAsyncThunk<SearchType, string, { rejectValue: KnownError }>(
  "movies/fetchSearchResults",
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        SEARCH_ENDPOINT + query
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
