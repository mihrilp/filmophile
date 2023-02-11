import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, TOP_RATED_TV_SHOWS_ENDPOINT } from "@/api";
import { AxiosError } from "axios";

const initialState: ApiState = {
    loading: false,
    data: [],
    error: undefined
};

export const fetchTopRatedTvShows = createAsyncThunk<TvShow[], void, { rejectValue: KnownError }>(
    "tvShows/fetchTopRatedTvShows",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await instance.get(
                TOP_RATED_TV_SHOWS_ENDPOINT
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

export const topRatedTvShowsSlice = createSlice({
    name: "topRatedTvShows",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTopRatedTvShows.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTopRatedTvShows.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchTopRatedTvShows.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default topRatedTvShowsSlice.reducer;
