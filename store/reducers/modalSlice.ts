import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: false,
  reducers: {
    changeModalVisibility: (state) => {
      state = !state;
      return state;
    },
  },
});

export const { changeModalVisibility } = modalSlice.actions;
export default modalSlice.reducer;
