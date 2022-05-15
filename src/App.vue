<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <h1>Good evening</h1>
  </nav>
  <router-view />
</template>

<script setup lang="ts">
// import { useStore } from "@/store";
// import { onMounted } from "vue";
// import baseRequest from "@/utils/baseRequest";
// import { AWSEndpoints, RequestMethods } from "@/types/apiTypes";

// const store = useStore();

// onMounted(async () => {
//   store.userAccount = await baseRequest(
//     AWSEndpoints.GET_ACCOUNT + process.env.VUE_APP_AWS_BASE_URL,
//     RequestMethods.GET
//   );
// });
</script>

<style lang="scss">
// This is the global style sheet
@import "./assets/styles/reset.css";
@import "./assets/styles/fonts.css";

#app {
  background-color: $black;
  color: $white;
  font-family: "OpenSans";
  font-weight: 400;
}

h1 {
  font-size: 24px;
  font-weight: 300;
}

h2 {
  font-size: 16px;
  font-weight: 600;
}

h3 {
  font-size: 11px;
  font-weight: 300;
}

nav {
  padding: 30px;

  a {
    font-weight: 600;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
