<template>
  <div v-if="store.loading || !film">Loading...</div>
  <div class="film" v-else>
    <h1 class="film__title">{{ film.title }}</h1>
    <img
      class="film__image"
      v-if="imageUrl"
      :src="imageUrl"
      :alt="film.title + ' image'"
    />
  </div>
</template>

<script setup lang="ts">
import baseRequest from "@/utils/baseRequest";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { RequestMethods, TMDBEndpoints, FilmDetails } from "../types/apiTypes";

const store = useStore();
const route = useRoute();
const film = ref<null | FilmDetails>(null);

const imageUrl = computed(() => {
  if (film.value)
    return (
      process.env.VUE_APP_TMDB_MEDIA_URL +
      (film.value.poster_path ?? film.value.backdrop_path)
    );
  return null;
});

onMounted(async () => {
  film.value = await baseRequest(
    process.env.VUE_APP_TMDB_BASE_URL +
      TMDBEndpoints.FILM_DETAILS +
      route.params.id,
    RequestMethods.GET
  );
});
</script>

<style scoped lang="scss">
.film {
  &__title {
    margin-bottom: $spacing-big;
  }

  &__image {
    width: 100%;
  }
}
</style>
