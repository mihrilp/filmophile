import { createSlice } from "@reduxjs/toolkit";

interface BannerState {
  data: {
    id: number;
    original_title?: string;
    original_name?: string;
    backdrop_path: string;
    vote_average: number;
    overview: string;
  }
}

const initialState: BannerState = {
  data: {
    id: 0,
    original_title: "",
    original_name: "",
    backdrop_path: "",
    vote_average: 0.0,
    overview: "",
  }
};

export const bannerSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const { setBannerData } = bannerSlice.actions;
export default bannerSlice.reducer;
