<template>
  <div class="search">
    <header class="g-page-header">
      <h1 class="g-page-header__title">Search</h1>
    </header>
    <div class="search__wrapper">
      <TheSearch />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheSearch from "@/components/TheSearch.vue";
</script>

<style scoped lang="scss">
.search {
  @include body;
}
</style>
