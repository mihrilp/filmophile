import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    addRecentlytViewedMovie: (state, { payload }) => {
      return [...state, payload];
    },
  },
});

export const { addRecentlytViewedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
