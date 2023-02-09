import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, TOP_RATED_MOVIES_ENDPOINT } from "@/api";
import { AxiosError } from "axios";

const initialState: MoviesState = {
    loading: false,
    data: [],
    error: undefined
};

export const fetchTopRatedMovies = createAsyncThunk<Movie[], void, { rejectValue: KnownError }>(
    "movies/fetchTopRatedMovies",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await instance.get(
                TOP_RATED_MOVIES_ENDPOINT
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

export const topRatedMoviesSlice = createSlice({
    name: "topRatedMovies",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTopRatedMovies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchTopRatedMovies.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default topRatedMoviesSlice.reducer;
