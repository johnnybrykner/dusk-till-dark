<template>
  <transition name="notification">
    <figure
      :class="{
        notification: true,
        'notification--error': store.thrownError,
        'notification--success': store.notificationText,
      }"
      v-if="store.thrownError || store.notificationText"
    >
      <img
        v-if="store.thrownError"
        src="../assets/images/error_icon.svg"
        alt="Notification error icon"
      />
      <img
        v-if="store.notificationText"
        src="../assets/images/success_icon.svg"
        alt="Notification success icon"
      />
      <figcaption>{{ store.thrownError ?? store.notificationText }}</figcaption>
    </figure>
  </transition>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

const store = useStore();
</script>

<style scoped lang="scss">
.notification {
  @include flex-row;
  position: fixed;
  top: $spacing-big;
  left: $spacing-medium;
  right: $spacing-medium;
  z-index: 1;
  padding: $spacing-medium;

  &--error {
    background-color: $error;
  }
  &--success {
    background-color: $success;
  }

  &.notification-enter-active,
  &.notification-leave-active {
    transition: transform 0.2s ease;
  }

  &.notification-enter-from,
  &.notification-leave-to {
    transform: scale(0);
  }
}
</style>
