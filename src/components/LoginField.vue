<template>
  <section class="login-field">
    <div class="g-loading" v-if="store.loading">
      <img src="../assets/images/loading.svg" alt="Loading animation" />
    </div>
    <div class="field__container">
      <img class="field__icon field__icon--left" src="../assets/images/account_icon_white.svg" alt="White account icon">
      <input type="search" placeholder="Username">
      <img class="field__icon field__icon--right" src="../assets/images/arrow-forward_icon_white.svg"
        alt="White arrow forward">
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
  margin: 0 $spacing-max;
  padding-bottom: $spacing-medium;
  border-bottom: 1px solid $white;

  .field__container {
    position: relative;
    display: flex;
    align-items: center;

    input {
      margin-left: $spacing-max;
    }

    .field__icon {
      position: absolute;
      width: $icon-size-small;

      &--left {
        left: 0;
      }

      &--right {
        right: 0;
        margin-top: $spacing-small;
      }
    }
  }
}
</style>
