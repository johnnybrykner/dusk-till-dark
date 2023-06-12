<template>
  <div v-if="!film || !filmCredits" class="g-loading">
    <img src="../assets/images/loading.svg" alt="Loading animation" />
  </div>
  <div class="film" v-else>
    <header class="g-page-header">
      <h1 class="g-page-header__title">{{ film.title }}</h1>
    </header>
    <div class="film__wrapper">
      <img
        class="poster"
        v-if="imageUrl"
        :src="imageUrl"
        :alt="film.title + ' image'"
      />
      <div class="details">
        <div v-if="filmDirector" class="details__director">
          <h4>Director</h4>
          <h2>
            {{ filmDirector.original_name }}
          </h2>
        </div>
        <div class="details__duration">
          <h4>Duration</h4>
          <h2>{{ formatLength(film.runtime) }}</h2>
        </div>
        <div class="details__release" v-if="formattedReleaseDate">
          <h4>Release</h4>
          <h2>
            {{ formattedReleaseDate.day }}.{{ formattedReleaseDate.month }}.{{
              formattedReleaseDate.year
            }}
          </h2>
        </div>
        <div class="details__language">
          <h4>Language</h4>
          <h2>{{ film.original_language }}</h2>
        </div>
      </div>
      <div class="cast">
        <h4>Cast</h4>
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
        <h4>Overview</h4>
        <h2>{{ film.overview }}</h2>
      </div>
      <div class="production">
        <h4>Production countries</h4>
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

      <!-- Todo: come back to this, rework the functionality of immediately fetching streaming providers -->
      <!-- <div class="providers" ref="watchProvidersElement">
        <h4>Streaming availability</h4>
        <div class="providers__wrapper">
          <h2 v-if="isAvailableOnNetflix">Netflix</h2>
          <h2 v-if="isAvailableOnPrime">Primevideo</h2>
          <h2 v-if="isAvailableOnDisney">Disney+</h2>
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
      </div> -->

      <div class="rating">
        <div class="rating__wrapper">
          <h2>Give rating</h2>
          <img src="../assets/images/arrow-forward_icon_black.svg" alt="" />
        </div>
      </div>
      <div class="add">
        <div class="add__wrapper">
          <h2>Add to To Watch List</h2>
          <img src="../assets/images/arrow-forward_icon_black.svg" alt="" />
        </div>
      </div>
      <div class="remove">
        <div class="remove__wrapper">
          <h2>Remove film from library</h2>
          <img src="../assets/images/arrow-forward_icon_black.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { baseTmdbRequest } from "@/utils/baseRequest";
import { computed, onMounted, ref, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { useAccount } from "@/store/account";
import {
  RequestMethods,
  TMDBEndpoints,
  AWSEndpoints,
  FilmDetailsResponse,
  FilmCreditsResponse,
  WatchProvidersReponse,
  OurWatchProviders,
  FilmCrew,
} from "../types/apiTypes";
import { formatDate, formatLength } from "@/utils/dataFormatters";

const store = useStore();
const account = useAccount();
const route = useRoute();

const watchProvidersElement = ref<null | HTMLElement>(null);
const film = ref<null | FilmDetailsResponse>(null);
const filmCredits = ref<null | FilmCreditsResponse>(null);
const availableProviders = ref<null | WatchProvidersReponse>(null);

const alreadyInToWatch = computed(() => {
  if (!account.userAccount?.to_watch) return null;
  return !!account.userAccount.to_watch.find(
    (listItem) => listItem.id === film.value?.id
  );
});

// const alreadyInWatchedList = computed(() => {
//   if (!account.userAccount?.previously_watched) return null;
//   return !!account.userAccount.previously_watched.find(
//     (listItem) => listItem.id === film.value?.id
//   );
// });

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
  availableProviders.value = await baseTmdbRequest(
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

function addToWatchList() {
  account.updateToWatch(
    AWSEndpoints.ADD_TO_WATCH,
    film.value as FilmDetailsResponse,
    filmDirector.value as FilmCrew,
    formattedReleaseDate.value ? formattedReleaseDate.value.year : 0
  );
}

function removeFromWatchList() {
  account.updateToWatch(
    AWSEndpoints.REMOVE_TO_WATCH,
    film.value as FilmDetailsResponse,
    filmDirector.value as FilmCrew,
    formattedReleaseDate.value ? formattedReleaseDate.value.year : 0
  );
}

onMounted(async () => {
  film.value = await baseTmdbRequest(
    process.env.VUE_APP_TMDB_BASE_URL +
      TMDBEndpoints.FILM_DETAILS +
      route.params.id,
    RequestMethods.GET
  );
  filmCredits.value = await baseTmdbRequest(
    process.env.VUE_APP_TMDB_BASE_URL +
      TMDBEndpoints.FILM_DETAILS +
      route.params.id +
      TMDBEndpoints.FILM_CREDITS,
    RequestMethods.GET
  );
});
</script>

<style scoped lang="scss">
.film {
  .g-page-header {
    text-align: center;
  }

  &__wrapper {
    @include flex-column($row-gap: $spacing-min);
    margin-top: $spacing-max;

    .poster {
      width: 100%;
    }

    .details {
      @include grid-view($gap: $spacing-big);
      grid-template-columns: 50% 50%;
      column-gap: 0px;

      &__language h2 {
        text-transform: uppercase;
      }
    }

    .cast,
    .production {
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

    .providers,
    .rating,
    .add,
    .remove {
      &__wrapper {
        @include flex-row;
        justify-content: space-between;
      }
    }

    .details,
    .cast,
    .overview,
    .production,
    .providers,
    .rating,
    .add,
    .remove {
      @include tile;
    }
  }
}
</style>
