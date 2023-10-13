<template>
  <section class="home">
    <router-link to="/settings" class="account-link">
      <img src="../assets/images/settings_icon_white.svg" class="icon" alt="Settings icon" />
    </router-link>
    <header class="g-page-header">
      <h1 class="g-page-header__title">Dusk Till Dark</h1>
      <h4 class="g-page-header__subtitle">
        {{ store.headerGreeting }}
      </h4>
    </header>
    <div class="home-wrapper">
      <TheSearch @click="router.replace({ name: 'search' })" hide-results />
    </div>
  </section>
</template>

<script setup lang="ts">
import TheSearch from "@/components/TheSearch.vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";

const store = useStore();
const router = useRouter();
</script>

<style lang="scss" scoped>
.home {
  @include body;

  .account-link {
    position: absolute;
    right: $spacing-big;
    top: $spacing-big;

    img {
      width: $button-size;
    }
  }
}
</style>
