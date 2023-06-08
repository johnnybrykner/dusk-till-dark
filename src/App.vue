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
  @include page-gradient;
  background-attachment: fixed;
  min-height: 100vh;
}

h1 {
  font-family: "JostMedium";
  font-size: 28px;
  color: $white;
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

h4 {
  font-family: "JostRegular";
  font-size: 12px;
}

a,
p {
  font-family: "JostRegular";
  font-size: 16px;
  font-weight: 400;
}

.g-page-header {
  @include flex-column;
  align-items: center;
  padding: $spacing-big $spacing-max;

  &__title {
    text-transform: capitalize;
  }

  &__subtitle {
    color: $white;
    text-transform: capitalize;
  }

  &__wrapper {
    @include flex-row;
    justify-content: space-between;
    align-items: flex-start;
    position: sticky;
    z-index: 3;
    top: $spacing-medium;
    min-height: 24.5px;
    max-height: $page-title-height;
    overflow: hidden;
  }
}
.g-page-title {
  position: sticky;
  top: $spacing-medium;
  margin-bottom: $spacing-small * 5;
  padding: 0 $spacing-medium;
}

.g-loading {
  @include flex-row;
  justify-content: center;
}
</style>
