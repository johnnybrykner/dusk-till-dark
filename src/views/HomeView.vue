<template>
  <div class="home">
    <div v-if="store.userAccount">{{ store.userAccount }}</div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { useAccount } from "@/store/account";

const store = useAccount();
</script>

<style lang="scss" scoped></style>
