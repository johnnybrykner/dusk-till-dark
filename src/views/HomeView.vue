<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div v-if="store.userAccount">{{ store.userAccount }}</div>
    <div v-else>Loading...</div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "@/store";

const store = useStore();
</script>
