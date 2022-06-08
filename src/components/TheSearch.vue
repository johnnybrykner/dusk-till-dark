<template>
  <section class="the-search">
    <input
      type="search"
      class="the-search__field"
      placeholder="Quickly find films"
      @input="(event) => debouncedSearch(event.target as HTMLInputElement)"
    />
    <ul class="the-search__results" v-if="search.tmdbResults.length">
      <li
        class="search-result"
        v-for="result in search.tmdbResults"
        :key="result.id"
      >
        <router-link :to="'/film/' + result.id">
          <h2>{{ result.original_title }}</h2>
          <h3 class="details">
            {{ result.original_language }} <span class="dot" />
            {{ result.release_date }}
          </h3>
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
  &__field {
    width: 100%;
    height: $bar-height;
    background-color: $purple-light;
    border-radius: $border-radius;
    border: none;
    outline: none;
    padding: $spacing-med;
    font-size: 16px;
    font-weight: 500;
    color: $purple-dark;
  }

  &__results {
    @include flex-column;
    margin-top: $spacing-big;

    .search-result {
      @include tile;

      a {
        @include flex-column($row-gap: $spacing-med);
        text-decoration: none;
        color: $white;
        font-size: 16px;
        font-weight: 400;

        .details {
          @include flex-row($col-gap: $spacing-small);

          .dot {
            @include dot;
          }
        }
      }
    }
  }
}
</style>
