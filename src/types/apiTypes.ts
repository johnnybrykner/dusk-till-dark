export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
}

export interface Film {
  director: string;
  film_genres?: Set<string>;
  id: number;
  length: number;
  name: string;
  our_rating?: number;
  providers?: AvailableProviders;
  year: number;
}

export interface FilmResponse {
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

export interface FilmDetails {
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

export interface AvailableProviders {
  disney: boolean;
  netflix: boolean;
  prime: boolean;
}

export interface FilmGenre {
  id: number;
  name: string;
}

export interface FilmLocation {
  iso_3166_1: number;
  name: string;
}

export enum AWSEndpoints {
  GET_ACCOUNT = "https://f45m7vc6ytsljdo7tkexl45opi0krdrt.",
}

export enum TMDBEndpoints {
  FILM_SEARCH = "search/movie",
  FILM_DETAILS = "movie/",
}
