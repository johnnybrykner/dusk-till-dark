<template>
  <ul class="list-wrapper">
    <li v-for="film in props.films" :key="film.id" class="list-item">
      <router-link :to="'/film/' + film.id">
        <h2>{{ film.name }}</h2>
        <h4 class="details">
          {{ formatLength(film.length) }} <span class="dot" />
          {{ film.director }} <span class="dot" /> {{ film.year }}
        </h4>
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

        .dot {
          @include dot;
        }
      }
    }
  }
}
</style>
