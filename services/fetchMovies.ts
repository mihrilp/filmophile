import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie/",
});

export const fetchPopularMovies = async () => {
  try {
    const { data } = await instance.get(
      `popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const { data } = await instance.get(
      `top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const { data } = await instance.get(
      `upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMovieDetail = async (id: string) => {
  try {
    const { data } = await instance.get(
      `${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMovieVideoUrl = async (id: number) => {
  try {
    const { data } = await instance.get(
      `${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );
    return data.results[0].key;
  } catch (err) {
    console.log(err);
  }
};
