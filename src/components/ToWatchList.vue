<template>
  <ul class="list-wrapper">
    <li v-for="film in props.films" :key="film.id">
      <router-link :to="'/film/' + film.id" class="result">
        <div class="result__wrapper">
          <h2 class="title">{{ film.name }}</h2>
        </div>
        <h3 class="result__details">
          {{ formatLength(film.length) }} <span class="dot" />
          {{ film.director }} <span class="dot" /> {{ film.year }}
        </h3>
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
  @include flex-column;

  .result {
    @include tile;
    @include flex-column;
    text-decoration: none;

    &__wrapper {
      @include flex-row;
      align-items: flex-start;
      justify-content: space-between;
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
