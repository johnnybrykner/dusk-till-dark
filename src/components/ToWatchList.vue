<template>
  <ul class="list-wrapper">
    <li v-for="film in props.films" :key="film.id" class="result">
      <div class="result__wrapper">
        <h2 class="title">{{ film.name }}</h2>
        <img
          v-if="film.providers?.disney"
          class="provider"
          src="@/assets/images/disney-plus-logo.png"
        />
        <img
          v-if="film.providers?.netflix"
          class="provider"
          src="@/assets/images/netflix-logo.png"
        />
        <img
          v-if="film.providers?.prime"
          class="provider"
          src="@/assets/images/prime-video-logo.jpeg"
        />
      </div>
      <h3 class="result__details">
        {{ film.length }} <span class="dot" /> {{ film.director }}
        <span class="dot" /> {{ film.year }}
      </h3>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { OurFilmInterface } from "@/types/apiTypes";
import { defineProps } from "vue";

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

      .provider {
        width: 30px;
        height: auto;
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
