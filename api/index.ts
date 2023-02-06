import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";

export const instance = axios.create({
    baseURL: BASE_URL,
});

export const POPULAR_MOVIES_ENDPOINT = `movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`;
export const TOP_RATED_MOVIES_ENDPOINT = `movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`;
export const UPCOMING_MOVIES_ENDPOINT = `movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`;
export const SEARCH_ENDPOINT = `search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1&query=`;