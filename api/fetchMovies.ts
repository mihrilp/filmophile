import { instance,POPULAR_MOVIES_ENDPOINT } from ".";

export const fetchPopularMovies = async () => {
  try {
    const { data } = await instance.get(
      POPULAR_MOVIES_ENDPOINT
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
};


export const fetchTopRatedMovies = async () => {
  try {
    const { data } = await instance.get(
      `movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchUpcomingMovies = async () => {
  try {
    const { data } = await instance.get(
      `movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=1`
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMovieDetail = async (id: string) => {
  try {
    const { data } = await instance.get(
      `movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMovieVideoUrl = async (id: number) => {
  try {
    const { data } = await instance.get(
      `movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );
    return data.results[0].key;
  } catch (err) {
    console.log(err);
  }
};

export const fetchSearchedMovie = async (query: string) => {
  try {
    const { data } = await instance.get(
      `search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}`
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

