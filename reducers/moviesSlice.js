import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: [] };

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addRecentlytViewedMovie: (state, action) => {
      const { payload } = action;
      state.value.push(payload);
    },
  },
});

export const { addRecentlytViewedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
