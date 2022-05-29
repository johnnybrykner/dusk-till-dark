<template>
  <div v-if="store.loading || !film">Loading...</div>
  <div class="film" v-else>
    <header class="g-page-header"></header>
    <div class="g-page-header__wrapper">
      <h1 class="g-page-title">{{ film.title }}</h1>
      <div class="add">
        <img src="../assets/images/add_icon.svg" alt="" />
      </div>
    </div>
    <div class="film__wrapper">
      <img
        class="poster"
        v-if="imageUrl"
        :src="imageUrl"
        :alt="film.title + ' image'"
      />
      <div class="details">
        <div class="details__wrapper">
          <div class="director">
            <h3>Director</h3>
            <h2>Peter Jackson</h2>
          </div>
          <div class="duration">
            <h3>Release</h3>
            <h2>{{ film.release_date }}</h2>
          </div>
        </div>
        <div class="details__wrapper">
          <div class="duration">
            <h3>Duration</h3>
            <h2>{{ film.runtime }}</h2>
          </div>
          <div class="language">
            <h3>Language</h3>
            <h2>{{ film.original_language }}</h2>
          </div>
        </div>
      </div>
      <!-- <div class="cast">
        <h3>Cast</h3>
      </div> -->
      <div class="overview">
        <h3>Overview</h3>
        <h2>{{ film.overview }}</h2>
      </div>
      <div class="production">
        <h3>Production countries</h3>
        <div class="production__wrapper">
          <h2
            v-for="country in film.production_countries"
            :key="country.name"
            class="country-name"
          >
            {{ country.name }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import baseRequest from "@/utils/baseRequest";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import {
  RequestMethods,
  TMDBEndpoints,
  FilmDetailsResponse,
} from "../types/apiTypes";

const store = useStore();
const route = useRoute();
const film = ref<null | FilmDetailsResponse>(null);

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
  .g-page-header {
    &__wrapper {
      .add {
        padding: 0 $spacing-med;

        img {
          width: 24px;
        }
      }
    }
  }

  &__wrapper {
    @include flex-column;
    align-items: center;

    h3 {
      margin-bottom: $spacing-small;
    }

    .poster {
      width: 50%;
    }

    .details {
      @include flex-column;

      &__wrapper {
        @include flex-row;

        & > * {
          flex-basis: 50%;
        }
      }
    }

    .production {
      &__wrapper {
        @include flex-row($col-gap: $spacing-small);
        flex-wrap: wrap;
        .country-name {
          @include flex-row($col-gap: $spacing-small);

          &:not(:first-of-type)::before {
            content: "\00B7";
            display: block;
            font-size: 25px;
          }
        }
      }
    }

    .details,
    .cast,
    .overview,
    .production {
      @include tile;
    }
  }
}
</style>
