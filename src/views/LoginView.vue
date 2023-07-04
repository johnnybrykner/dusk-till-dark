<template>
  <div class="login">
    <header class="g-page-header">
      <h1 class="g-page-header__title">Dusk till Dark</h1>
    </header>
    <div class="login__wrapper">
      <LoginField />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginField from "@/components/LoginField.vue";
</script>

<style scoped lang="scss">
.login {
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;

  &__wrapper {
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    justify-content: center;
  }
}
</style>
