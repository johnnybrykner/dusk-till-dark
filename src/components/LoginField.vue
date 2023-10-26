<template>
  <section class="login-field">
    <div class="g-loading" v-if="store.loading">
      <img src="../assets/images/loading.gif" alt="Loading animation" />
    </div>
    <div v-else>
      <div class="login-field__container">
        <img src="../assets/images/account_icon_white.png" class="icon" alt="White account icon" />
        <input type="search" placeholder="Username" v-model="username" class="field"
          @keyup="(keyEvent) => { if (keyEvent.code === 'Enter') userLogin() }" />
        <img src="../assets/images/arrow-right_icon_white.png" class="icon" alt="Arrow forward icon" @click="userLogin" />
      </div>
      <span class="line"></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { useAccount } from "@/store/account";
import { RequestMethods } from "@/types/apiTypes";
import { baseAccountRequest } from "@/utils/baseRequest";
import { ref } from "vue";
import { useRouter } from "vue-router";
const store = useStore();
const account = useAccount();
const router = useRouter();

const username = ref("");

async function userLogin() {
  if (!!username.value.trim()) {
    const loginResult = await baseAccountRequest(
      "authenticate/" + username.value,
      RequestMethods.GET,
    );
    console.log(loginResult);
    if (loginResult) {
      account.userAccount = loginResult;
      router.replace({ name: "home" });
    };
  }
}
</script>

<style scoped lang="scss">
.login-field {
  margin: $spacing-max;

  &__container {
    @include flex-row($col-gap: $spacing-medium);

    .icon {
      width: $icon-size-small;
    }

    .field {
      width: 100%;
    }
  }

  .line {
    display: block;
    height: $spacing-min;
    background-color: $white;
    margin-top: $spacing-small;
  }
}
</style>
