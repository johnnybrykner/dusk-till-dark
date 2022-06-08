<template>
  <div class="lists">
    <header class="g-page-header"></header>
    <div class="g-page-header__wrapper">
      <Transition name="slide-up" mode="out-in">
        <h1 v-if="listToggled" class="g-page-title">Watched list</h1>
        <h1 v-else class="g-page-title">To watch list</h1>
      </Transition>
      <div
        @click="toggleList"
        class="swap"
        :class="{ 'swap--flipped': listToggled }"
      >
        <img src="../assets/images/swap_icon.svg" alt="Swap icon" />
      </div>
    </div>
    <Transition name="fade" mode="out-in">
      <div v-if="store.loading" class="g-loading">
        <img src="../assets/images/loading.svg" alt="Loading animation" />
      </div>
      <WatchedList
        v-else-if="listToggled"
        :films="accountStore.userAccount.previously_watched"
      />
      <ToWatchList v-else :films="accountStore.userAccount.to_watch" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import ToWatchList from "@/components/ToWatchList.vue";
import WatchedList from "@/components/WatchedList.vue";
import { useAccount } from "@/store/account";
import { useStore } from "@/store";
import { ref } from "vue";
const accountStore = useAccount();
const store = useStore();

const listToggled = ref(false);

function toggleList() {
  listToggled.value = !listToggled.value;
}
</script>

<style scoped lang="scss">
.g-page-header {
  &__wrapper {
    .swap {
      padding: 0 $spacing-med;
      transition: transform 0.2s ease;

      &--flipped {
        transform: rotateX(180deg);
      }
    }
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
