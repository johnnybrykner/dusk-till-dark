import { RequestMethods, TMDBEndpoints, FilmResponse } from "@/types/apiTypes";
import baseRequest from "@/utils/baseRequest";
import { defineStore } from "pinia";

export const useSearch = defineStore("search", {
  state: () => {
    return {
      tmdbResults: [] as FilmResponse[],
    };
  },
  getters: {},
  actions: {
    async tmdbSearch(searchString: string) {
      const response = await baseRequest(
        process.env.VUE_APP_TMDB_BASE_URL + TMDBEndpoints.FILM_SEARCH,
        RequestMethods.GET,
        searchString
      );
      if (response) this.tmdbResults = response.results;
    },
  },
});
