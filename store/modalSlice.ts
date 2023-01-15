import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  visibility: boolean;
  videoUrl: string;
}

const initialState : ModalState = {
  visibility: false,
  videoUrl: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.visibility = true;
    },
    closeModal: (state) => {
      state.visibility = false;
    },
    setVideoUrl : (state, action) => {
      state.videoUrl = action.payload;
    }
  },
});

export const { openModal, closeModal, setVideoUrl } = modalSlice.actions;
export default modalSlice.reducer;
