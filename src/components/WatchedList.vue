<template>
  <ul class="list-wrapper">
    <li v-for="film in props.films" :key="film.id" class="list-item">
      <router-link :to="'/film/' + film.id">
        <h2 class="title">{{ film.name }}</h2>
        <div class="details">
          <div class="details__our-rating" v-if="film.our_rating">
            <img
              src="../assets/images/star_icon_black.svg"
              class="rating-icon"
              alt="Star icon"
            />
            <h3 class="rating">{{ film.our_rating }}</h3>
          </div>
          <div class="details__tmdb-rating" v-if="film.our_rating">
            <img
              src="../assets/images/tmdb_logo.svg"
              class="tmdb-logo"
              alt="TMDB logo"
            />
            <!-- change to tmdb rating when possible -->
            <h3 class="rating tmdb-rating">{{ film.our_rating }}</h3>
          </div>
          <div class="details__no-rating" v-if="!film.our_rating">
            <img
              src="../assets/images/star_icon_black.svg"
              class="rating-icon"
              alt="Star icon"
            />
            <h3>Give rating</h3>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { OurFilmInterface } from "@/types/apiTypes";
import { defineProps } from "vue";
import { formatLength } from "@/utils/dataFormatters";

const props = defineProps<{
  films: OurFilmInterface[];
}>();
</script>

<style scoped lang="scss">
.list-wrapper {
  @include flex-column($row-gap: $spacing-min);
  margin-top: $spacing-max;

  .list-item {
    a {
      @include tile;
      @include flex-column($row-gap: $spacing-medium);
      text-decoration: none;
      color: $black;

      .details {
        @include flex-row($col-gap: $spacing-medium);

        &__our-rating,
        &__tmdb-rating,
        &__no-rating {
          @include flex-row($col-gap: $spacing-small);

          .rating-icon {
            height: $icon-size-small;
          }

          .rating {
            font-size: 16px;
          }

          .tmdb-logo {
            height: $icon-size-min;
          }

          .tmdb-rating {
            color: #01b4e4;
          }
        }
      }
    }
  }
}
</style>
