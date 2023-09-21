<template>
  <div class="lists">
    <header class="g-page-header lists__header">
      <Transition name="slide-up" mode="out-in">
        <h1 v-if="listToggled" class="g-page-title">Watched list</h1>
        <h1 v-else class="g-page-title">To watch list</h1>
      </Transition>
      <div @click="toggleList" class="swap" :class="{ 'swap--flipped': listToggled }">
        <img src="../assets/images/swap_icon.svg" class="swap__icon" alt="Swap icon" />
      </div>
    </header>
    <div class="transition__container">
      <div v-if="store.loading || !accountStore.userAccount" class="g-loading">
        <img src="../assets/images/loading.gif" alt="Loading animation" />
      </div>
      <WatchedList v-else-if="listToggled" :films="accountStore.userAccount.previously_watched"
        :unmountTransitionRunning="listTransitInProgress" />
      <ToWatchList v-else :films="accountStore.userAccount.to_watch" :unmountTransitionRunning="listTransitInProgress" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ToWatchList from "@/components/ToWatchList.vue";
import WatchedList from "@/components/WatchedList.vue";
import { useAccount } from "@/store/account";
import { useStore } from "@/store";
import { nextTick, ref } from "vue";
const accountStore = useAccount();
const store = useStore();

const listToggled = ref(false);
const listTransitInProgress = ref(false);

function toggleList() {
  listTransitInProgress.value = true;
  setTimeout(async () => {
    listToggled.value = !listToggled.value;
    await nextTick();
    listTransitInProgress.value = false;
  }, 200);
}
</script>

<style scoped lang="scss">
.lists {
  @include body;

  &__header {
    @include flex-row($col-gap: 0px);
    justify-content: center;
  }
}

.g-page-header {
  .g-page-title {
    flex-grow: 1;
    text-align: center;
  }

  .swap {
    transition: transform 0.2s ease;

    &--flipped {
      transform: rotateX(180deg);
    }

    &__icon {
      height: $icon-size-big;
    }
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: rotateX(90deg);
}

.slide-up-leave-to {
  opacity: 0;
  transform: rotateX(-90deg);
}

.transition__container {
  position: relative;

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
  }

  .fade-enter-from {
    opacity: 0;
  }

  .fade-leave-to {
    opacity: 0;
  }
}
</style>
