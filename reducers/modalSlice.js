import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false };

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    changeModalVisibility: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeModalVisibility } = modalSlice.actions;
export default modalSlice.reducer;
