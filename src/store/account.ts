import {
  AddToPreviouslyWatched,
  AddToWatch,
  AWSEndpoints,
  FilmCrew,
  FilmDetailsResponse,
  RequestMethods,
  UserAccount,
} from "@/types/apiTypes";
import { baseAwsRequest } from "@/utils/baseRequest";
import { defineStore } from "pinia";

export const useAccount = defineStore("account", {
  state: () => {
    return {
      userAccount: {} as UserAccount,
    };
  },
  getters: {},
  actions: {
    async updateToWatch(
      listAction: AWSEndpoints,
      filmDetails: FilmDetailsResponse,
      filmDirector: FilmCrew,
      filmReleaseYear: number,
    ) {
      const filmToAdd: AddToWatch = {
        director: filmDirector.original_name,
        film_genres: filmDetails.genres,
        id: filmDetails.id,
        length: filmDetails.runtime,
        name: filmDetails.title,
        year: filmReleaseYear,
      };
      this.userAccount = await baseAwsRequest(
        listAction,
        RequestMethods.PATCH,
        filmToAdd,
      );
    },
    async updatePreviouslyWatched(
      listAction: AWSEndpoints,
      filmDetails: FilmDetailsResponse,
      filmDirector: FilmCrew,
      filmReleaseYear: number,
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
      this.userAccount = await baseAwsRequest(
        listAction,
        RequestMethods.PATCH,
        filmToAdd,
      );
    },
  },
});
