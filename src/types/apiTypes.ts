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

export interface AvailableProviders {
  Disney: boolean;
  Netflix: boolean;
  Prime: boolean;
}

export enum AWSEndpoints {
  GET_ACCOUNT = "https://f45m7vc6ytsljdo7tkexl45opi0krdrt.",
}

export enum TMDBEndpoints {
  GET_FILM = "movie/",
}
