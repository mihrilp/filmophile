import { instance, POPULAR_TV_SHOWS_ENDPOINT, TOP_RATED_TV_SHOWS_ENDPOINT, TRENDING_TV_SHOWS_ENDPOINT } from ".";

export const fetchPopularTvShows = async () => {
    try {
        const { data } = await instance.get(
            POPULAR_TV_SHOWS_ENDPOINT
        );
        return data.results;
    } catch (err) {
        console.log(err);
    }
};

export const fetchTopRatedTvShows = async () => {
    try {
        const { data } = await instance.get(
            TOP_RATED_TV_SHOWS_ENDPOINT
        );
        return data.results;
    } catch (err) {
        console.log(err);
    }
};

export const fetchTrendingTvShows = async () => {
    try {
      const { data } = await instance.get(
        TRENDING_TV_SHOWS_ENDPOINT
      );
      return data.results;
    } catch (err) {
      console.log(err);
    }
  };

export const fetchTvShowDetail = async (id: string) => {
    try {
        const { data } = await instance.get(
            `tv/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const fetchTvShowVideos = async (id: number) => {
    try {
        const { data } = await instance.get(
            `tv/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
        );
        return data.results;
    } catch (err) {
        console.log(err);
    }
};


export const fetchTvShowCredits = async (id: number) => {
    try {
      const { data } = await instance.get(
        `tv/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
      );
      return data;
    } catch (err) {
      console.log(err);
    }
  }