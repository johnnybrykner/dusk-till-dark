<template>
  <div class="page-header">
    <h1 class="page-header__title">{{ store.headerGreeting }}</h1>
  </div>
</template>

<script setup lang="ts">
// import { ref } from "vue";
import { useStore } from "@/store";

const store = useStore();
</script>

<style scoped lang="scss">
.page-header {
  @include top-gradient;
  position: fixed;
  top: 0;
  height: $header-height;
  width: 100vw;

  &__title {
    padding: 50px calc($spacing-med * 2) calc($spacing-big * 2)
      calc($spacing-med * 2);
  }
}
</style>
