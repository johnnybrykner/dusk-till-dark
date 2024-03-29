<template>
  <StatusNotification />
  <div class="body">
    <router-view />
    <MainNavigation v-if="route.name !== 'login'" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import MainNavigation from "./components/MainNavigation.vue";
import StatusNotification from "./components/StatusNotification.vue";
import { useRoute, useRouter } from "vue-router";
import { useAccount } from "@/store/account";
import { baseAccountRequest } from "./utils/baseRequest";
import { RequestMethods } from "./types/apiTypes";

const route = useRoute();
const router = useRouter();
const account = useAccount();

onMounted(async () => {
  console.log("App mounted");
  if (account.userAccount) return;
  const loginAttempt = await baseAccountRequest(
    "users/account",
    RequestMethods.GET,
  );
  console.log(loginAttempt);
  if (loginAttempt) {
    account.userAccount = loginAttempt;
  } else {
    router.replace({ name: "login" });
  }
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
  font-family: "JostMedium";
  font-size: 16px;
  line-height: 30px;
}

h3 {
  font-family: "JostSemiBold";
  font-size: 14px;
}

h4 {
  font-family: "JostRegular";
  font-size: 12px;
  line-height: 18px;
}

a,
p {
  font-family: "JostRegular";
  font-size: 16px;
  font-weight: 400;
}

a {
  text-decoration: none;
}

input {
  border: none;
  outline: none;
  background-color: transparent;
  color: $white;
  font-family: "JostMedium";
  font-size: 18px;
  padding: 0;
}

.g-page-header {
  @include flex-column;
  align-items: center;
  padding: $spacing-big $spacing-max;

  .g-page-title {
    text-transform: capitalize;
  }

  &__subtitle {
    color: $white;
    text-transform: capitalize;
  }

  // &__wrapper {
  //   @include flex-row;
  //   justify-content: space-between;
  //   align-items: flex-start;
  //   position: sticky;
  //   z-index: 3;
  //   top: $spacing-medium;
  //   min-height: 24.5px;
  //   max-height: $page-title-height;
  //   overflow: hidden;
  // }
}

.g-loading {
  @include flex-row;
  justify-content: center;

  img {
    width: $button-size;
    height: $button-size;
  }
}
</style>
