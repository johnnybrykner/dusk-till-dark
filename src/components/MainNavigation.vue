<template>
  <footer class="page-footer">
    <div class="page-footer__navbar">
      <router-link to="/" class="router-link">
        <img src="../assets/images/main-page_icon_white.png" class="icon" alt="Home icon" />
        <h4>Home</h4>
      </router-link>
      <router-link to="/search" class="router-link">
        <img src="../assets/images/search_icon_white.png" class="icon" alt="Search icon" />
        <h4>Search</h4>
      </router-link>
      <router-link to="/lists" class="router-link">
        <img src="../assets/images/list_icon_white.png" class="icon" alt="List icon" />
        <h4>Your movies</h4>
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
  justify-content: space-between;
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 1;
  background-color: $wine;

  &__navbar {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: $spacing-big;

    .router-link {
      @include flex-column;
      align-items: center;

      img {
        width: $icon-size-big;
      }

      h4 {
        color: $white;
      }
    }
  }

  &__references {
    @include flex-row($col-gap: $spacing-medium);
    justify-content: center;
    padding: $spacing-medium $spacing-max;

    img {
      height: $icon-size-min;
    }
  }
}
</style>
