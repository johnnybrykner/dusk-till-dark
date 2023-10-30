export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

export interface OurFilmInterface {
  director: string;
  film_genres: FilmGenre[];
  id: number;
  length: number;
  name: string;
  year: number;
  language: string;
  our_rating?: number | null;
  their_rating?: number | null;
}

export interface FilmSearch {
  id: number;
  name: string;
}

export interface FilmSearchResponse {
  poster_path: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  vote_average: number;
}

export interface UserAccount {
  previously_watched: OurFilmInterface[];
  recent_searches: FilmSearch[];
  to_watch: OurFilmInterface[];
  account_settings: AccountSettings;
  username: string;
}

export interface AccountSettings {
  streaming_countries: StreamingCountry[];
  streaming_providers: StreamingProvider[];
}

export interface StreamingCountry {
  country_code: string;
  country_name: string;
}

export interface StreamingProvider {
  provider_id: number;
  provider_name: string;
  logo_path?: string;
}

export interface FilmDetailsResponse {
  backdrop_path: string;
  genres: FilmGenre[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  production_countries: FilmLocation[];
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
}

export interface FilmCreditsResponse {
  id: number;
  cast: FilmActor[];
  crew: FilmCrew[];
}

export interface FilmActor {
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface FilmCrew {
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface WatchProvidersReponse {
  id: number;
  results: {
    [key: string]: CountryWatchProviders;
  };
}

export interface CountryWatchProviders {
  link: string;
  flatrate?: WatchProvider[];
  buy?: WatchProvider[];
  rent?: WatchProvider[];
}

export interface WatchProvider {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
  provider_country?: string;
}

export interface FilmGenre {
  id: number;
  name: string;
}

export interface FilmLocation {
  iso_3166_1: number;
  name: string;
}

export interface FormattedDate {
  year: number;
  month: number;
  day: number;
}

export enum OurWatchProviders {
  NETFLIX = 8,
  DISNEY = 337,
  PRIME = 119,
}

export enum TMDBEndpoints {
  FILM_SEARCH = "search/movie",
  FILM_DETAILS = "movie/",
  FILM_CREDITS = "/credits",
  WATCH_PROVIDERS = "/watch/providers",
}

export enum ListNames {
  TO_WATCH = "to_watch",
  PREVIOUSLY_WATCHED = "previously_watched",
}
