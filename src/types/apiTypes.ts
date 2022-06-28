export enum RequestMethods {
  GET = "GET",
  PATCH = "PATCH",
}

export interface OurFilmInterface {
  director: string;
  film_genres?: FilmGenre[];
  id: number;
  length: number;
  name: string;
  our_rating?: number;
  year: number;
}

export interface AddToWatch {
  director: string;
  film_genres: FilmGenre[];
  id: number;
  length: number;
  name: string;
  year: number;
}

export interface AddToPreviouslyWatched {
  director: string;
  id: number;
  length: number;
  name: string;
  our_rating: number;
  year: number;
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
  previously_watched: AddToPreviouslyWatched[];
  recent_searches: FilmSearch[];
  to_watch: AddToWatch[];
  username: string;
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

export enum AWSEndpoints {
  GET_ACCOUNT = "https://f45m7vc6ytsljdo7tkexl45opi0krdrt.",
  ADD_TO_WATCH = "https://crhpfnm44rqsy457nesrawvcwi0pldit.",
  ADD_PREVIOUSLY_WATCHED = "https://7tdqyc4cginsdkl7rsluiawhse0cpuxy.",
  REMOVE_TO_WATCH = "https://sm27no2ghycyomfcloqvg2lgjy0qjckv.",
  REMOVE_PREVIOUSLY_WATCHED = "https://k542njzonwvxbhfxmx6wjy4sgy0xoxat.",
}

export enum TMDBEndpoints {
  FILM_SEARCH = "search/movie",
  FILM_DETAILS = "movie/",
  FILM_CREDITS = "/credits",
  WATCH_PROVIDERS = "/watch/providers",
}
