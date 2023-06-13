<template>
  <section class="the-search">
    <div class="the-search__container">
      <div class="input-container">
        <img src="../assets/images/search_icon_white.svg" alt="Search icon" />
        <input
          type="search"
          class="input-container__field"
          placeholder="Search films"
          @input="(event: InputEvent) => debouncedSearch(event.target as HTMLInputElement)"
        />
        <router-link to="/search">
          <img
            src="../assets/images/arrow-forward_icon_white.svg"
            alt="Arrow forward icon"
          />
        </router-link>
      </div>
      <span class="line"></span>
    </div>
    <ul class="the-search__results" v-if="search.tmdbResults.length">
      <li
        class="search-result"
        v-for="result in search.tmdbResults"
        :key="result.id"
      >
        <router-link :to="'/film/' + result.id">
          <h2>{{ result.original_title }}</h2>
          <h4 class="details">
            {{ result.original_language }} <span class="dot" />
            {{ result.release_date }}
          </h4>
        </router-link>
      </li>
    </ul>
    <div class="g-loading" v-else-if="store.loading">
      <img src="../assets/images/loading.svg" alt="Loading animation" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSearch } from "@/store/search";
import { useStore } from "@/store";
import { ref } from "vue";
const search = useSearch();
const store = useStore();

const debounceTimer = ref<number>(0);

function debouncedSearch(input: HTMLInputElement) {
  clearTimeout(debounceTimer.value);
  debounceTimer.value = setTimeout(() => {
    if (input.value.trim()) search.tmdbSearch(input.value.trim());
  }, 750);
}
</script>

<style scoped lang="scss">
.the-search {
  &__container {
    margin: $spacing-max;

    .input-container {
      @include flex-row($col-gap: $spacing-medium);
      &__field {
        width: $calc-page-width;
        border: none;
        outline: none;
        background-color: transparent;
        color: $white;
        font-family: "JostMedium";
        font-size: 18px;
      }
    }

    .line {
      display: block;
      width: $calc-page-width;
      height: $spacing-min;
      background-color: $white;
      margin-top: $spacing-small;
    }
  }

  &__results {
    @include flex-column($row-gap: $spacing-min);
    margin-top: $spacing-max;

    .search-result {
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
}
</style>
