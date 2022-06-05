<template>
  <div v-if="store.loading || !film">Loading...</div>
  <div class="film" v-else>
    <PageOverlay>
      <div class="overlay-container">
        <div class="overlay-option" @click="addToWatch">
          <img src="../assets/images/list_icon.svg" alt="" />
          <h2>To watch list</h2>
        </div>
        <div class="overlay-option" @click="addToPreviouslyWatched">
          <img src="../assets/images/list_icon.svg" alt="" />
          <h2>Previously watched list</h2>
        </div>
      </div>
    </PageOverlay>
    <header class="g-page-header"></header>
    <div class="g-page-header__wrapper">
      <h1
        class="g-page-title"
        :style="{ color: store.showOverlay ? 'transparent' : 'inherit' }"
      >
        {{ film.title }}
      </h1>
      <div
        class="add"
        @click="store.showOverlay = true"
        v-if="!store.showOverlay"
      >
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
          <div v-if="filmDirector" class="director">
            <h3>Director</h3>
            <h2>
              {{ filmDirector.original_name }}
            </h2>
          </div>
          <div class="duration">
            <h3>Duration</h3>
            <h2>{{ formatLength(film.runtime) }}</h2>
          </div>
        </div>
        <div class="details__wrapper">
          <div class="release" v-if="formattedReleaseDate">
            <h3>Release</h3>
            <h2>
              {{ formattedReleaseDate.day }}.{{ formattedReleaseDate.month }}.{{
                formattedReleaseDate.year
              }}
            </h2>
          </div>
          <div class="language">
            <h3>Language</h3>
            <h2>{{ film.original_language }}</h2>
          </div>
        </div>
      </div>
      <div class="cast">
        <h3>Cast</h3>
        <div class="cast__wrapper">
          <h2
            v-for="castMember in filmCast"
            :key="castMember.id"
            class="cast-member-name"
          >
            {{ castMember.name }}
          </h2>
        </div>
      </div>
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
  FilmCreditsResponse,
  AddToWatch,
  AddToPreviouslyWatched,
} from "../types/apiTypes";
import PageOverlay from "../components/PageOverlay.vue";
import { formatDate, formatLength } from "@/utils/dataFormatters";

const store = useStore();
const route = useRoute();
const film = ref<null | FilmDetailsResponse>(null);
const filmCredits = ref<null | FilmCreditsResponse>(null);

const imageUrl = computed(() => {
  if (film.value)
    return (
      process.env.VUE_APP_TMDB_MEDIA_URL +
      (film.value.poster_path ?? film.value.backdrop_path)
    );
  return null;
});

const filmDirector = computed(() => {
  if (filmCredits.value)
    return filmCredits.value.crew.find(
      (crewMember) => crewMember.job === "Director"
    );
  return null;
});

const filmCast = computed(() => {
  if (filmCredits.value)
    return filmCredits.value.cast
      .filter((castMember) => castMember.known_for_department === "Acting")
      .slice(0, 7);
  return null;
});

const formattedReleaseDate = computed(() => {
  if (film.value) return formatDate(film.value.release_date);
  return null;
});

async function addToWatch() {
  if (!film.value) return;
  const filmToAdd: AddToWatch = {
    director: filmDirector.value
      ? filmDirector.value.original_name
      : "unspecified",
    film_genres: film.value?.genres,
    id: film.value.id,
    length: film.value.runtime,
    name: film.value.title,
    //TODO: add year formatting
    year: 2000,
  };
}

async function addToPreviouslyWatched() {
  if (!film.value) return;
  const filmToAdd: AddToPreviouslyWatched = {
    director: filmDirector.value
      ? filmDirector.value.original_name
      : "unspecified",
    id: film.value.id,
    length: film.value.runtime,
    name: film.value.title,
    //TODO: change to our rating
    our_rating: film.value.vote_average,
    //TODO: add year formatting
    year: 2000,
  };
}

onMounted(async () => {
  film.value = await baseRequest(
    process.env.VUE_APP_TMDB_BASE_URL +
      TMDBEndpoints.FILM_DETAILS +
      route.params.id,
    RequestMethods.GET
  );
  filmCredits.value = await baseRequest(
    process.env.VUE_APP_TMDB_BASE_URL +
      TMDBEndpoints.FILM_DETAILS +
      route.params.id +
      TMDBEndpoints.FILM_CREDITS,
    RequestMethods.GET
  );
});
</script>

<style scoped lang="scss">
.overlay-container {
  @include flex-column;
  .overlay-option {
    @include tile-white;
    @include flex-row($col-gap: $spacing-small);
  }
}

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

    .production,
    .cast {
      &__wrapper {
        @include flex-row($col-gap: $spacing-small);
        flex-wrap: wrap;
        .country-name,
        .cast-member-name {
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
