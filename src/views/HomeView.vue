<template>
  <div class="home">
    <header class="g-page-header">
      <div class="g-page-header__gradient"></div>
    </header>
    <h1 v-if="route.name === 'home'" class="g-page-title">
      {{ store.headerGreeting }}
    </h1>
    <div class="home-wrapper">
      <KeepAlive>
        <TheSearch />
      </KeepAlive>
    </div>
  </div>
</template>

<script setup lang="ts">
import TheSearch from "@/components/TheSearch.vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";

const store = useStore();
const route = useRoute();
</script>

<style lang="scss" scoped>
.home-wrapper {
  @include content;
}
</style>
