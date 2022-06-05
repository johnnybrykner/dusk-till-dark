<template>
  <div class="home">
    <header class="g-page-header"></header>
    <h1 v-if="route.name === 'home'" class="g-page-title">
      {{ store.headerGreeting }}
    </h1>
    <KeepAlive>
      <TheSearch />
    </KeepAlive>
  </div>
</template>

<script setup lang="ts">
import TheSearch from "@/components/TheSearch.vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";

const store = useStore();
const route = useRoute();
</script>

<style lang="scss" scoped></style>
