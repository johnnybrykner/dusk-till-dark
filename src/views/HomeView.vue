<template>
  <section class="home">
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
      <div class="g-loading" v-if="store.loading || !accountStore.userAccount">
        <img src="../assets/images/loading.gif" alt="Loading animation" />
      </div>
      <div class="to-watch-list" v-else>
        <div class="to-watch_toggle" @click="toggleToWatch">
          <h2>To Watch List</h2>
          <img
            src="../assets/images/chevron_icon_black.png"
            class="chevron"
            :class="{ 'chevron--flipped': toWatchToggled }"
            alt="Arrow expand icon black"
          />
        </div>
        <ToWatchList
          :films="accountStore.userAccount.to_watch"
          v-if="toWatchToggled"
        />
      </div>
      <div class="account">
        <h2>Account</h2>
        <img
          src="../assets/images/arrow-right_icon_black.png"
          class="icon"
          alt="Arrow right icon black"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import TheSearch from "@/components/TheSearch.vue";
import ToWatchList from "@/components/ToWatchList.vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { useAccount } from "@/store/account";
import { ref } from "vue";
const accountStore = useAccount();

const store = useStore();
const route = useRoute();
const toWatchToggled = ref(true);

function toggleToWatch() {
  toWatchToggled.value = !toWatchToggled.value;
}
</script>

<style lang="scss" scoped>
.home {
  @include body;

  .to-watch-list {
    margin-bottom: $spacing-min;

    .to-watch_toggle {
      @include tile;
      @include flex-row;
      justify-content: space-between;
      margin-bottom: $spacing-min;

      .chevron {
        width: $icon-size-small;
        transition: transform 0.3s ease;

        &--flipped {
          transform: rotate3d(1, 0, 0, 0.5turn);
          transform-style: preserve-3d;
          perspective: 500px;
        }
      }
    }
  }

  .account {
    @include tile;
    @include flex-row;
    justify-content: space-between;

    .icon {
      width: $icon-size-small;
    }
  }
}
</style>
