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
import { baseAwsRequest } from "@/utils/baseRequest";
import { AWSEndpoints, RequestMethods } from "@/types/apiTypes";

const store = useAccount();

onMounted(async () => {
  store.userAccount = await baseAwsRequest(
    AWSEndpoints.GET_ACCOUNT,
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
    padding: $body-padding-top $spacing-med $body-padding-bottom $spacing-med;
    min-height: calc(100vh - $body-padding-top - $body-padding-bottom);
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
  @include flex-column;
  justify-content: flex-start;
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  height: $header-height;
  width: 100%;
  mask-image: linear-gradient(rgba(0, 0, 0, 1), transparent);

  &__gradient {
    @include top-gradient;
    height: 80%;
  }

  &__wrapper {
    @include flex-row;
    justify-content: space-between;
    align-items: flex-start;
    position: sticky;
    z-index: 3;
    top: $spacing-med;
    min-height: 24.5px;
    max-height: $page-title-height;
    overflow: hidden;
  }
}
.g-page-title {
  position: sticky;
  top: $spacing-med;
  margin-bottom: $spacing-small * 5;
  padding: 0 $spacing-med;
}

.g-loading {
  @include flex-row;
  justify-content: center;
}
</style>
