<template>
  <transition name="fade" mode="out-in">
    <div class="overlay" v-if="store.showOverlay">
      <header class="overlay__header">
        <h1>List management</h1>
        <img
          src="../assets/images/close_icon.svg"
          alt="Close icon"
          @click="store.showOverlay = false"
        />
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
  z-index: 4;
  height: 75%;
  bottom: 0;
  right: 0;
  left: 0;
  background: $black;
  mask-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.99)),
    linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.99)),
    linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.99)),
    linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.99)),
    linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.99)),
    linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.99)),
    linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.99)),
    linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.99));
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  padding: ($spacing-med * 2) $spacing-med $body-padding-bottom $spacing-med;
  overflow-y: hidden;

  &__header {
    @include flex-row;
    justify-content: space-between;
    padding: 0 $spacing-med;
    margin-bottom: calc($spacing-med * 2);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  transform: translateY(100%);
}
</style>
