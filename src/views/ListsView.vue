<template>
  <div class="lists">
    <button @click="toggleList">Switch</button>
    <Transition name="fade" mode="out-in">
      <WatchedList
        v-if="listToggled"
        :films="store.userAccount.previously_watched"
      />
      <ToWatchList v-else :films="store.userAccount.to_watch" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import ToWatchList from "@/components/ToWatchList.vue";
import WatchedList from "@/components/WatchedList.vue";
import { useAccount } from "@/store/account";
import { ref } from "vue";
const store = useAccount();

const listToggled = ref(false);

function toggleList() {
  listToggled.value = !listToggled.value;
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
