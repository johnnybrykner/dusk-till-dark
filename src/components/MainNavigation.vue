<template>
  <footer class="page-footer">
    <div class="page-footer__navbar">
      <router-link to="/" class="router-link">
        <img
          src="../assets/images/home_icon.svg"
          class="icon"
          alt="Home icon"
        />
      </router-link>
      <router-link to="/" class="router-link">
        <img
          src="../assets/images/search_icon.svg"
          class="icon"
          alt="Search icon"
        />
      </router-link>
      <router-link to="/lists" class="router-link">
        <img
          src="../assets/images/list_icon.svg"
          class="icon"
          alt="List icon"
        />
      </router-link>
    </div>
    <div class="page-footer__references">
      <p class="name">Dusk Till Dark</p>
      <div class="sources">
        <img src="../assets/images/tmdb_logo.svg" alt="TMDB logo" />
        <img src="../assets/images/just_watch_logo.png" alt="JustWatch logo" />
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.page-footer {
  position: fixed;
  bottom: 0;
  width: calc(100% - calc($spacing-med * 2));

  &__navbar {
    @include flex-row;
    align-items: center;
    background-color: $white;
    border-radius: $border-radius;
    height: $bar-height;

    .router-link {
      flex-basis: calc(100% / 3);
      @include flex-row;
      justify-content: center;

      .icon {
        height: 24px;
        color: $black;
      }
    }
  }

  &__references {
    @include footer-gradient;
    @include grid-view;
    grid-template-columns: 60px 1fr 60px;
    padding: $spacing-med;

    .name {
      grid-column-start: 2;
      grid-column-end: 3;
      color: $purple-light;
      text-align: center;
    }

    .sources {
      grid-column-start: 3;
      grid-column-end: 4;
      justify-self: end;
      width: 100%;
      display: flex;
      gap: $spacing-small;

      img {
        height: 16px;
      }
    }
  }
}
</style>
