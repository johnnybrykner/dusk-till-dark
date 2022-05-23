<template>
  <StatusNotification />
  <PageHeader />
  <div class="wrapper">
    <router-view />
    <MainNavigation />
  </div>
</template>

<script setup lang="ts">
import PageHeader from "./components/PageHeader.vue";
import MainNavigation from "./components/MainNavigation.vue";
import StatusNotification from "./components/StatusNotification.vue";
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
  min-height: 100vh;
  background-color: $black;
  color: $white;
  font-family: "OpenSans";
  font-weight: 400;

  .wrapper {
    padding: $header-height $spacing-med * 2;
  }
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

p {
  font-size: 16px;
  font-weight: 400;
}
</style>
