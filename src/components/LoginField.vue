<template>
  <section class="login-field">
    <div class="g-loading" v-if="store.loading">
      <img src="../assets/images/loading.gif" alt="Loading animation" />
    </div>
    <div v-else>
      <div class="login-field__container">
        <img
          src="../assets/images/account_icon_white.png"
          class="icon"
          alt="White account icon"
        />
        <input type="search" placeholder="Username" />
        <img
          src="../assets/images/arrow-right_icon_white.png"
          class="icon"
          alt="Arrow forward icon"
        />
      </div>
      <span class="line"></span>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useStore } from "@/store";
import { ref } from "vue";
const store = useStore();
</script>

<style scoped lang="scss">
.login-field {
  margin: $spacing-max;

  &__container {
    @include flex-row($col-gap: $spacing-medium);

    .icon {
      width: $icon-size-small;
    }

    input {
      width: $calc-page-width;
    }
  }

  .line {
    display: block;
    width: $calc-page-width;
    height: $spacing-min;
    background-color: $white;
    margin-top: $spacing-small;
  }
}
</style>
