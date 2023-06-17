<template>
  <div class="login">
    <header class="g-page-header">
      <h1 class="g-page-header__title">Dusk till Dark</h1>
      <h4 class="g-page-header__subtitle">Login</h4>
    </header>
    <div class="login__wrapper">
      <LoginField />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginField from "@/components/LoginField.vue";
</script>
