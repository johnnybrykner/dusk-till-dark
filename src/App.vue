<template>
  <StatusNotification />
  <div class="wrapper">
    <router-view />
    <MainNavigation />
  </div>
</template>

<script setup lang="ts">
import MainNavigation from "./components/MainNavigation.vue";
import StatusNotification from "./components/StatusNotification.vue";
import { useAccount } from "@/store/account";
import { onMounted } from "vue";
import baseRequest from "@/utils/baseRequest";
import { AWSEndpoints, RequestMethods } from "@/types/apiTypes";

const store = useAccount();

onMounted(async () => {
  store.userAccount = await baseRequest(
    AWSEndpoints.GET_ACCOUNT + process.env.VUE_APP_AWS_BASE_URL,
    RequestMethods.GET
  );
});
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
    padding: 60px $spacing-med $header-height $spacing-med;
  }
}

h1 {
  font-size: 24px;
  font-weight: 300;
}

h2 {
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}

h3 {
  font-size: 11px;
  font-weight: 400;
}

p {
  font-size: 16px;
  font-weight: 400;
}

.g-page-header {
  @include top-gradient;
  @include flex-column;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  height: $header-height;
  width: calc(100% - #{$spacing-med * 4});
  padding: 0 $spacing-med * 2;

  &__wrapper {
    @include flex-row;
    justify-content: space-between;
    align-items: flex-start;
    position: sticky;
    top: $spacing-med;
  }
}
.g-page-title {
  position: sticky;
  top: $spacing-med;
  margin-bottom: $spacing-small * 5;
  padding: 0 $spacing-med;
}
</style>
