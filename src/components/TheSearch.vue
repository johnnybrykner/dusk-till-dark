<template>
  <section class="the-search">
    <div class="the-search__container">
      <div class="input-container">
        <img src="../assets/images/search_icon_white.png" class="input-container__icon" alt="Search icon" />
        <input type="search" class="input-container__field" placeholder="Search films"
          @input="(event: Event) => debouncedSearch(event.target as HTMLInputElement)" ref="searchField" />
        <router-link to="/search">
          <img src="../assets/images/arrow-right_icon_white.png" class="input-container__icon" alt="Arrow forward icon" />
        </router-link>
      </div>
      <span class="line"></span>
    </div>
    <ul class="the-search__results" v-if="search.tmdbResults.length && !props.hideResults">
      <li class="search-result" v-for="result in search.tmdbResults" :key="result.id">
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
      <img src="../assets/images/loading.gif" alt="Loading animation" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useSearch } from "@/store/search";
import { useStore } from "@/store";
import { onMounted, ref } from "vue";
const props = defineProps({
  autofocus: Boolean,
  hideResults: Boolean,
});

const search = useSearch();
const store = useStore();

const searchField = ref<HTMLInputElement>();

const debounceTimer = ref<number>(0);

function debouncedSearch(input: HTMLInputElement) {
  clearTimeout(debounceTimer.value);
  debounceTimer.value = setTimeout(() => {
    if (input.value.trim()) search.tmdbSearch(input.value.trim());
  }, 750);
}

onMounted(() => {
  if (props.autofocus) {
    searchField.value?.focus();
  }
})
</script>

<style scoped lang="scss">
.the-search {
  &__container {
    margin: $spacing-max;

    .input-container {
      @include flex-row($col-gap: $spacing-medium);

      &__icon {
        width: $icon-size-small;
      }

      &__field {
        width: 100%;
      }
    }

    .line {
      display: block;
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
