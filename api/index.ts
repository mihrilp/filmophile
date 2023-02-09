import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";

export const instance = axios.create({
    baseURL: BASE_URL,
});

//movies
export const TRENDING_MOVIES_ENDPOINT = `/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
export const POPULAR_MOVIES_ENDPOINT = `movie/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`;
export const TOP_RATED_MOVIES_ENDPOINT = `movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`;
export const UPCOMING_MOVIES_ENDPOINT = `movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`;

//tv shows
export const TRENDING_TV_SHOWS_ENDPOINT = `/trending/tv/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

//search
export const SEARCH_ENDPOINT = `search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1&query=`;