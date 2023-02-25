interface Movie {
  id: number;
  original_title: string;
  backdrop_path?: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview?: string;
  tagline?: string | undefined;
  genres: [];
  spoken_languages: [];
  production_countries: [];
  production_companies: [];
  media_type: string;
  vote_count?: number;
  runtime: number;
}

interface Person {
  id: number;
  name: string;
  imgUrl: string;
  media_type: string;
  profile_path: string;
  known_for_department: string;
}

interface TvShow {
  id: number;
  original_name: string;
  backdrop_path?: string;
  poster_path: string;
  first_air_date: string;
  vote_average: number;
  media_type: string;
  overview?: string;
  origin_country: string;
  genres: [];
  spoken_languages: [];
  production_countries: [];
  production_companies: [];
  tagline?: string | undefined;
}

interface CardProps {
  name: string | undefined;
  imgUrl: string;
  date?: string;
  score?: string;
  department?: string;
}

interface KnownError {
  code: number;
  message: string;
}

interface MovieState {
  loading: boolean;
  data: Movie[];
  error: KnownError | undefined;
}

interface TvShowState {
  loading: boolean;
  data: TvShow[];
  error: KnownError | undefined;
}

interface CreditProps {
  id: number;
  name: string;
  profile_path: string;
  character?: string;
  department?: string;  
}
