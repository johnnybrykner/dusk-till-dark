<template>
  <div class="settings">
    <header class="g-page-header">
      <h1 class="g-page-header__title">Settings</h1>
    </header>
    <div class="settings__wrapper">
      <div class="option">
        <h2>Set streaming country</h2>
        <img
          src="../assets/images/arrow-forward_icon_black.svg"
          alt="Arrow forward icon"
        />
      </div>
      <div class="option">
        <h2>Set providers</h2>
        <img
          src="../assets/images/arrow-forward_icon_black.svg"
          alt="Arrow forward icon"
        />
      </div>
      <div class="option">
        <h2>Log out</h2>
        <img
          src="../assets/images/arrow-forward_icon_black.svg"
          alt="Arrow forward icon"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.settings {
  &__wrapper {
    @include flex-column($row-gap: $spacing-min);
    margin-top: $spacing-max;

    .option {
      @include tile;
      @include flex-row;
      justify-content: space-between;
    }
  }
}
</style>
