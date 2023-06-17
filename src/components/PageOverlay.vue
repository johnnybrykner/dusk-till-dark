<template>
  <transition name="fade-in">
    <div class="overlay" v-if="store.showOverlay">
      <header class="overlay__header">
        <h1>List management</h1>
        <img src="../assets/images/close_icon.svg" alt="Close icon" @click="store.showOverlay = false" />
      </header>
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

const store = useStore();
</script>

<style scoped lang="scss">
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: linear-gradient(180deg, rgba(143, 148, 251, 0.9) 0%, rgba(78, 84, 200, 0.9) 100%);
  z-index: 4;
  padding: $spacing-medium * 2 $spacing-medium;

  &__header {
    @include flex-row;
    justify-content: space-between;
    padding: 0 $spacing-medium;
  }
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.3s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
}
</style>
