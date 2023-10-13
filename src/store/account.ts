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
      userAccount: null as UserAccount | null,
    };
  },
  getters: {
    selectedCountries(state) {
      if (!state.userAccount) return [];
      return state.userAccount.account_settings.streaming_countries;
    },
    selectedProviders(state) {
      if (!state.userAccount) return [];
      return state.userAccount.account_settings.streaming_providers;
    }
  },
  actions: {
    async addToWatch(
      filmDetails: FilmDetailsResponse,
      filmDirector: FilmCrew,
      filmReleaseYear: number,
    ) {
      if (!this.userAccount) return;
      const filmToAdd: OurFilmInterface = {
        director: filmDirector.original_name,
        film_genres: filmDetails.genres,
        id: filmDetails.id,
        length: filmDetails.runtime,
        name: filmDetails.title,
        year: filmReleaseYear,
        language: filmDetails.original_language,
      };
      const accountRequestResult = await baseAccountRequest(
        this.userAccount.username + "/add_to/to_watch",
        RequestMethods.POST,
        filmToAdd,
      );
      if (accountRequestResult) this.userAccount = accountRequestResult;
    },
    async addToPreviouslyWatched(
      filmDetails: FilmDetailsResponse,
      filmDirector: FilmCrew,
      filmReleaseYear: number,
    ) {
      if (!this.userAccount) return;
      const filmToAdd: OurFilmInterface = {
        director: filmDirector.original_name,
        id: filmDetails.id,
        length: filmDetails.runtime,
        name: filmDetails.title,
        year: filmReleaseYear,
        film_genres: filmDetails.genres,
        language: filmDetails.original_language,
      };
      const accountRequestResult = await baseAccountRequest(
        this.userAccount.username + "/add_to/previously_watched",
        RequestMethods.POST,
        filmToAdd,
      );
      if (accountRequestResult) this.userAccount = accountRequestResult;
    },
  },
});
