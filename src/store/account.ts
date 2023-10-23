import {
  AccountSettings,
  FilmCrew,
  FilmDetailsResponse,
  ListNames,
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
        "users/add_to/to_watch",
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
        "users/add_to/previously_watched",
        RequestMethods.POST,
        filmToAdd,
      );
      if (accountRequestResult) this.userAccount = accountRequestResult;
    },
    async moveToPreviouslyWatched(filmId: number) {
      if (!this.userAccount) return;
      const accountRequestResult = await baseAccountRequest(
        `users/move_to_watched/${filmId}`,
        RequestMethods.PUT,
      );
      if (accountRequestResult) this.userAccount = accountRequestResult;
    },
    async removeFilm(listName: ListNames, filmId: number) {
      if (!this.userAccount) return;
      const accountRequestResult = await baseAccountRequest(
        `users/remove_from/${listName}/${filmId}`,
        RequestMethods.DELETE,
      );
      if (accountRequestResult) this.userAccount = accountRequestResult;
    },
    async updateSettings(user_settings: AccountSettings) {
      if (!this.userAccount) return;
      const accountRequestResult = await baseAccountRequest(
        "users/settings",
        RequestMethods.PUT,
        user_settings,
      );
      if (accountRequestResult) this.userAccount = accountRequestResult;
    },
    async userLogout() {
      if (!this.userAccount) return;
      await baseAccountRequest(
        "users/logout",
        RequestMethods.GET,
      );
    }
  },
});
