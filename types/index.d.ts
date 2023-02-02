interface Movie {
  id: number ;
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
}
interface CardProps {
  name: string;
  imgUrl: string;
  date: string;
  score: string;
}

interface KnownError{
  code: number;
  message: string;
}
interface MoviesState {
  loading: boolean;
  data: Movie[];
  error: KnownError | null | unknown;
}