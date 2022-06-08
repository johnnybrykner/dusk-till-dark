import {
  AddToPreviouslyWatched,
  AddToWatch,
  AWSEndpoints,
  FilmCrew,
  FilmDetailsResponse,
  RequestMethods,
  UserAccount,
} from "@/types/apiTypes";
import baseRequest from "@/utils/baseRequest";
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
      filmReleaseYear: number
    ) {
      const filmToAdd: AddToWatch = {
        director: filmDirector.original_name,
        film_genres: filmDetails.genres,
        id: filmDetails.id,
        length: filmDetails.runtime,
        name: filmDetails.title,
        year: filmReleaseYear,
      };
      // await baseRequest(
      //   AWSEndpoints.PATCH_TO_WATCH + process.env.VUE_APP_AWS_BASE_URL,
      //   RequestMethods.PATCH
      // );
    },
    async addToPreviouslyWatched(
      filmDetails: FilmDetailsResponse,
      filmDirector: FilmCrew,
      filmReleaseYear: number
    ) {
      const filmToAdd: AddToPreviouslyWatched = {
        director: filmDirector.original_name,
        id: filmDetails.id,
        length: filmDetails.runtime,
        name: filmDetails.title,
        //TODO: change to our rating
        our_rating: filmDetails.vote_average,
        year: filmReleaseYear,
      };
      // await baseRequest(
      //   AWSEndpoints.PATCH_PREVIOUSLY_WATCHED +
      //     process.env.VUE_APP_AWS_BASE_URL,
      //   RequestMethods.PATCH
      // );
    },
  },
});
