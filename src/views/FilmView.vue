<template>
  <div v-if="!film || !filmCredits" class="g-loading">
    <img src="../assets/images/loading.svg" alt="Loading animation" />
  </div>
  <div class="film" v-else>
    <PageOverlay>
      <div class="overlay-container">
        <div
          class="overlay-option"
          @click="account.addToWatch(film as FilmDetailsResponse, filmDirector as FilmCrew, formattedReleaseDate ? formattedReleaseDate.year : 0)"
        >
          <img src="../assets/images/list_icon.svg" alt="list-icon" />
          <h2>To watch list</h2>
        </div>
        <div
          class="overlay-option"
          @click="account.addToPreviouslyWatched(film as FilmDetailsResponse, filmDirector as FilmCrew, formattedReleaseDate ? formattedReleaseDate.year : 0)"
        >
          <img src="../assets/images/list_icon.svg" alt="list-icon" />
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
      <div class="actions-container" v-if="!store.showOverlay">
        <div class="watch" @click="checkProviderAvailability">
          <img src="../assets/images/play_icon.svg" alt="play-icon" />
        </div>
        <div class="add" @click="store.showOverlay = true">
          <img src="../assets/images/add_icon.svg" alt="" />
        </div>
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
      <div
        class="providers"
        v-if="availableProviders"
        ref="watchProvidersElement"
      >
        <h3>Streaming availability</h3>
        <div class="providers__wrapper">
          <img
            v-if="isAvailableOnNetflix"
            src="../assets/images/netflix.png"
            class="provider-img"
            alt="netflix"
          />
          <img
            v-if="isAvailableOnDisney"
            src="../assets/images/disney.png"
            class="provider-img"
            alt="disney"
          />
          <img
            v-if="isAvailableOnPrime"
            src="../assets/images/prime.png"
            class="provider-img"
            alt="prime"
          />
          <h2
            v-if="
              !isAvailableOnNetflix &&
              !isAvailableOnDisney &&
              !isAvailableOnPrime
            "
          >
            No streaming availability
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import baseRequest from "@/utils/baseRequest";
import { computed, onMounted, ref, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { useAccount } from "@/store/account";
import {
  RequestMethods,
  TMDBEndpoints,
  FilmDetailsResponse,
  FilmCreditsResponse,
  WatchProvidersReponse,
  OurWatchProviders,
  FilmCrew,
} from "../types/apiTypes";
import PageOverlay from "../components/PageOverlay.vue";
import { formatDate, formatLength } from "@/utils/dataFormatters";

const store = useStore();
const account = useAccount();
const route = useRoute();

const watchProvidersElement = ref<null | HTMLElement>(null);
const film = ref<null | FilmDetailsResponse>(null);
const filmCredits = ref<null | FilmCreditsResponse>(null);
const availableProviders = ref<null | WatchProvidersReponse>(null);

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

const isAvailableOnNetflix = computed(() => {
  return (
    availableProviders.value &&
    availableProviders.value.results.NL &&
    availableProviders.value.results.NL.flatrate &&
    availableProviders.value.results.NL.flatrate.find(
      (provider) => provider.provider_id === OurWatchProviders.NETFLIX
    )
  );
});

const isAvailableOnDisney = computed(() => {
  return (
    availableProviders.value &&
    availableProviders.value.results.NL &&
    availableProviders.value.results.NL.flatrate &&
    availableProviders.value.results.NL.flatrate.find(
      (provider) => provider.provider_id === OurWatchProviders.DISNEY
    )
  );
});

const isAvailableOnPrime = computed(() => {
  return (
    availableProviders.value &&
    availableProviders.value.results.NL &&
    availableProviders.value.results.NL.flatrate &&
    availableProviders.value.results.NL.flatrate.find(
      (provider) => provider.provider_id === OurWatchProviders.PRIME
    )
  );
});

const formattedReleaseDate = computed(() => {
  if (film.value) return formatDate(film.value.release_date);
  return null;
});

async function checkProviderAvailability() {
  if (availableProviders.value) return;
  availableProviders.value = await baseRequest(
    process.env.VUE_APP_TMDB_BASE_URL +
      TMDBEndpoints.FILM_DETAILS +
      route.params.id +
      TMDBEndpoints.WATCH_PROVIDERS,
    RequestMethods.GET
  );
  await nextTick();
  await nextTick();
  if (watchProvidersElement.value)
    watchProvidersElement.value.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
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

.actions-container {
  @include flex-row;
  justify-content: flex-end;
  cursor: pointer;
}

.film {
  .g-page-header {
    &__wrapper {
      .add {
        padding: 0 $spacing-med 0 0;

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

    .providers {
      &__wrapper {
        width: 100%;
        @include flex-row;
        justify-content: space-between;

        .provider-img {
          max-width: calc(100% / 3 - #{$spacing-big});
        }
      }
    }

    .details,
    .cast,
    .overview,
    .production,
    .providers {
      @include tile;
    }
  }
}
</style>
