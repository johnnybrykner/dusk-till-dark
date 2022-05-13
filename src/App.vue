<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { onMounted } from "vue";
import baseRequest from "@/utils/baseRequest";
import { AWSEndpoints, RequestMethods } from "@/types/apiTypes";

const store = useStore();

onMounted(async () => {
  store.userAccount = await baseRequest(
    AWSEndpoints.GET_ACCOUNT + process.env.VUE_APP_AWS_BASE_URL,
    RequestMethods.GET
  );
});
</script>

<style lang="scss">
// This is the global style sheet
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
