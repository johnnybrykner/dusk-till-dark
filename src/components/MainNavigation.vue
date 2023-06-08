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
  z-index: 1;

  &__navbar {
    @include flex-row;
    justify-content: space-between;
    position: fixed;
    bottom: 40px;
    z-index: 1;
    width: $calc-page-width;
    margin: 0px $spacing-max;

    .router-link {
      @include object-shadow;
      @include flex-column;
      justify-content: center;
      width: $button-size;
      height: $button-size;
      background-color: $white;
      border-radius: $border-radius;

      .icon {
        height: $icon-size-big;
        color: $black;
      }
    }
  }

  &__references {
    @include flex-row($col-gap: $spacing-medium);
    justify-content: center;

    img {
      height: $icon-size-small;
    }
  }
}
</style>
