interface Movie {
  id: number;
  original_title: string;
  backdrop_path?: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview?: string;
  tagline?: string | undefined;
  genres?: [];
  spoken_languages?: [];
  production_countries?: [];
  production_companies?: [];
}

interface PopularAction {
  type: ActionType.POPULAR;
  payload: Movie[];
}

interface TopRatedAction {
  type: ActionType.TOP_RATED;
  payload: Movie[];
}

interface UpComingAction {
  type: ActionType.UPCOMING;
  payload: Movie;
}

interface RecentlyViewedAction {
  type: ActionType.RECENTLY_VIEWED;
  payload: Movie;
}

type MoviesAction =
  | PopularAction
  | TopRatedAction
  | UpComingAction
  | RecentlyViewedAction;

  interface CardProps {
    name: string;
    imgUrl: string;
    date: string;
    score: string;
  }
