export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
}

export interface Film {
  id: number;
  name: string;
  rated?: boolean;
  vote_average?: number;
  providers?: AvailableProviders;
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

export interface AvailableProviders {
  disney: boolean;
  netflix: boolean;
  prime: boolean;
}

export enum AWSEndpoints {
  GET_ACCOUNT = "https://f45m7vc6ytsljdo7tkexl45opi0krdrt.",
}

export enum TMDBEndpoints {
  GET_FILM = "search/movie",
}
