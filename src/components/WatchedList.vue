<template>
  <ul class="list-wrapper">
    <li v-for="film in props.films" :key="film.id" class="result">
      <div class="result__wrapper">
        <h2 class="title">{{ film.name }}</h2>
        <h2 class="rating">{{ film.our_rating }}</h2>
      </div>
      <h3 class="result__details">
        {{ formatLength(film.length) }} <span class="dot" />
        {{ film.director }} <span class="dot" /> {{ film.year }}
      </h3>
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
  @include flex-column;

  .result {
    @include tile;
    @include flex-column;

    &__wrapper {
      @include flex-row;
      align-items: flex-start;
      justify-content: space-between;

      .rating {
        color: $purple-light;
        font-weight: 800;
      }
    }

    &__details {
      @include flex-row($col-gap: $spacing-small);

      .dot {
        @include dot;
      }
    }
  }
}
</style>
