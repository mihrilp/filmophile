import axios from "axios";

export const fetchPopularMovies = async () => {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMovieDetail = async (id) => {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMovieVideoUrl = async (id) => {
  try {
    const { data } = await axios(
      `${process.env.NEXT_PUBLIC_BASE_URL}${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );
    return data.results[0].key;
  } catch (err) {
    console.log(err);
  }
};
