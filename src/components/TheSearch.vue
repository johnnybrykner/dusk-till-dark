<template>
  <section class="the-search">
    <input
      type="search"
      class="the-search__field"
      @input="(event) => debouncedSearch(event.target as HTMLInputElement)"
    />
    <ul class="the-search__results" v-if="search.tmdbResults.length">
      <li
        class="search-result"
        v-for="result in search.tmdbResults"
        :key="result.id"
      >
        {{ result.original_title }}
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useSearch } from "@/store/search";
import { ref } from "vue";
const search = useSearch();

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
    padding: $spacing-med;
  }

  &__results {
    @include flex-column;
    margin-top: $spacing-big;

    .search-result {
      padding: $spacing-med;
      background-color: $grey;
    }
  }
}
</style>
