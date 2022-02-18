export interface Movie {
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

export enum ActionType {
  POPULAR = "FETCH_POPULAR_MOVIES",
  TOP_RATED = "FETCH_TOP_RATED_MOVIES",
  UPCOMING = "FETCH_UPCOMING_MOVIE",
  RECENTLY_VIEWED = "ADD_RECENTLY_VIEWED_MOVIE",
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

export type MoviesAction =
  | PopularAction
  | TopRatedAction
  | UpComingAction
  | RecentlyViewedAction;
