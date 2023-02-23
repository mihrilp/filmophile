import { instance,POPULAR_MOVIES_ENDPOINT, TRENDING_MOVIES_ENDPOINT } from ".";

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

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await instance.get(
      TRENDING_MOVIES_ENDPOINT
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

export const fetchMovieVideos = async (id: number) => {
  try {
    const { data } = await instance.get(
      `movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );
    return data.results;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMovieCredits = async (id: number) => {
  try {
    const { data } = await instance.get(
      `movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

