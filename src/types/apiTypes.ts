export enum RequestMethods {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
}

export interface OurFilmInterface {
  director: string;
  film_genres?: FilmGenre[];
  id: number;
  length: number;
  name: string;
  our_rating?: number;
  providers?: AvailableProviders;
  year: number;
}

// export interface AddToWatch {
//   "M": {
//     "director": {
//       "S": "Peter Jackson"
//     },
//     "film_genres": {
//       "L": [
//         {
//           "M": {
//             "id": {
//               "N": "12"
//             },
//             "name": {
//               "S": "Adventure"
//             }
//           }
//         },
//         {
//           "M": {
//             "id": {
//               "N": "14"
//             },
//             "name": {
//               "S": "Fantasy"
//             }
//           }
//         },
//         {
//           "M": {
//             "id": {
//               "N": "28"
//             },
//             "name": {
//               "S": "Action"
//             }
//           }
//         }
//       ]
//     },
//     "id": {
//       "N": "121"
//     },
//     "length": {
//       "N": "179"
//     },
//     "name": {
//       "S": "The Lord of the Rings: The Two Towers"
//     },
//     "providers": {
//       "M": {
//         "disney": {
//           "BOOL": true
//         },
//         "netflix": {
//           "BOOL": false
//         },
//         "prime": {
//           "BOOL": false
//         }
//       }
//     },
//     "year": {
//       "N": "2002"
//     }
//   }
// }

// export interface AddPreviouslyWatched {
//   "M": {
//     "director": {
//       "S": "Peter Jackson"
//     },
//     "id": {
//       "N": "120"
//     },
//     "length": {
//       "N": "179"
//     },
//     "name": {
//       "S": "The Lord of the Rings: The Fellowship of the Ring"
//     },
//     "our_rating": {
//       "N": "100"
//     },
//     "year": {
//       "N": "2001"
//     }
//   }
// }

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

export interface FilmCastResponse {
  id: number;
  cast: FilmActor[];
  crew: FilmCrew[];
}

export interface FilmActor {
  gender: number;
  id: number;
  known_for_departmen: string;
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
  PATCH_TO_WATCH = "https://crhpfnm44rqsy457nesrawvcwi0pldit.",
  PATCH_PREVIOUSLY_WATCHED = "https://7tdqyc4cginsdkl7rsluiawhse0cpuxy.",
}

export enum TMDBEndpoints {
  FILM_SEARCH = "search/movie",
  FILM_DETAILS = "movie/",
  FILM_CREDITS = "/credits",
}
