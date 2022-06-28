import {
  RequestMethods,
  TMDBEndpoints,
  FilmSearchResponse,
} from "@/types/apiTypes";
import { baseTmdbRequest } from "@/utils/baseRequest";
import { defineStore } from "pinia";

export const useSearch = defineStore("search", {
  state: () => {
    return {
      tmdbResults: [] as FilmSearchResponse[],
    };
  },
  getters: {},
  actions: {
    async tmdbSearch(searchString: string) {
      const response = await baseTmdbRequest(
        process.env.VUE_APP_TMDB_BASE_URL + TMDBEndpoints.FILM_SEARCH,
        RequestMethods.GET,
        searchString
      );
      if (response) this.tmdbResults = response.results;
    },
  },
});
