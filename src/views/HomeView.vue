<template>
  <div class="home">
    <header class="g-page-header">
      <h1 class="g-page-header__title">Dusk Till Dark</h1>
      <h4 v-if="route.name === 'home'" class="g-page-header__subtitle">
        {{ store.headerGreeting }}
      </h4>
    </header>
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
}
</style>
