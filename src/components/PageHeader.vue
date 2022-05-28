<template>
  <header class="page-header">
    <h1 v-if="route.name === 'home'" class="page-header__title">
      {{ store.headerGreeting }}
    </h1>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "@/store";

const store = useStore();
const route = useRoute();
</script>

<style scoped lang="scss">
.page-header {
  @include top-gradient;
  @include flex-column;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  height: $header-height;
  width: calc(100% - #{$spacing-med * 4});
  padding: 0 $spacing-med * 2;

  &__title {
    margin-bottom: $spacing-small * 5;
  }
}
</style>
