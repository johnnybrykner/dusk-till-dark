<template>
  <header class="page-header">
    <p v-if="store.thrownError" class="page-header__error">
      {{ store.thrownError }}
    </p>
    <h1 class="page-header__title">{{ store.headerGreeting }}</h1>
  </header>
</template>

<script setup lang="ts">
// import { ref } from "vue";
import { useStore } from "@/store";

const store = useStore();
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

  &__error {
    color: $error;
  }

  &__title {
    margin-bottom: $spacing-med * 2;
  }
}
</style>
