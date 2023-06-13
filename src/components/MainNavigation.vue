<template>
  <footer class="page-footer">
    <div class="page-footer__navbar">
      <router-link to="/" class="router-link">
        <img
          src="../assets/images/home_icon_black.svg"
          class="icon"
          alt="Home icon"
        />
      </router-link>
      <router-link to="/search" class="router-link">
        <img
          src="../assets/images/search_icon_black.svg"
          class="icon"
          alt="Search icon"
        />
      </router-link>
      <router-link to="/lists" class="router-link">
        <img
          src="../assets/images/movie_icon_black.svg"
          class="icon"
          alt="List icon"
        />
      </router-link>
      <router-link to="/settings" class="router-link">
        <img
          src="../assets/images/settings_icon_black.svg"
          class="icon"
          alt="Settings icon"
        />
      </router-link>
    </div>
    <div class="page-footer__references">
      <img src="../assets/images/tmdb_logo.svg" alt="TMDB logo" />
      <img src="../assets/images/just_watch_logo.png" alt="JustWatch logo" />
    </div>
  </footer>
</template>

<style scoped lang="scss">
.page-footer {
  @include flex-column;
  justify-content: flex-end;
  height: calc(
    $icon-size-small + 10px + $spacing-big + $button-size + $spacing-max
  );
  z-index: 1;

  &__navbar {
    @include flex-row;
    justify-content: space-between;
    position: fixed;
    bottom: calc($icon-size-small + 10px + $spacing-big);
    z-index: 1;
    width: $calc-page-width;
    margin: 0px $spacing-max;

    .router-link {
      @include button-round;
      @include object-shadow;
      @include flex-column;
    }
  }

  &__references {
    @include flex-row($col-gap: $spacing-medium);
    justify-content: center;
    margin-bottom: 10px;

    img {
      height: $icon-size-min;
    }
  }
}
</style>
