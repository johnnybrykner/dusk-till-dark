import {
  FilmCrew,
  FilmDetailsResponse,
  OurFilmInterface,
  RequestMethods,
  UserAccount,
} from "@/types/apiTypes";
import { baseAccountRequest } from "@/utils/baseRequest";
import { defineStore } from "pinia";

export const useAccount = defineStore("account", {
  state: () => {
    return {
      userAccount: {} as UserAccount,
    };
  },
  getters: {},
  actions: {
    async addToWatch(
      filmDetails: FilmDetailsResponse,
      filmDirector: FilmCrew,
      filmReleaseYear: number,
    ) {
      const filmToAdd: OurFilmInterface = {
        director: filmDirector.original_name,
        film_genres: filmDetails.genres,
        id: filmDetails.id,
        length: filmDetails.runtime,
        name: filmDetails.title,
        year: filmReleaseYear,
        language: filmDetails.original_language,
      };
      this.userAccount = await baseAccountRequest(
        RequestMethods.POST,
        filmToAdd,
      );
    },
    async addToPreviouslyWatched(
      filmDetails: FilmDetailsResponse,
      filmDirector: FilmCrew,
      filmReleaseYear: number,
    ) {
      const filmToAdd: OurFilmInterface = {
        director: filmDirector.original_name,
        id: filmDetails.id,
        length: filmDetails.runtime,
        name: filmDetails.title,
        year: filmReleaseYear,
        film_genres: filmDetails.genres,
        language: filmDetails.original_language,
      };
      this.userAccount = await baseAccountRequest(
        RequestMethods.POST,
        filmToAdd,
      );
    },
  },
});
