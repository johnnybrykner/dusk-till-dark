<template>
  <div class="page-footer--navbar">
    <router-link to="/" class="router-link">
      <img src="../assets/images/home_icon.svg" class="icon" alt="Home icon" />
      <h2>Home</h2>
    </router-link>
    <router-link to="/" class="router-link">
      <img
        src="../assets/images/search_icon.svg"
        class="icon"
        alt="Search icon"
      />
      <h2>Search</h2>
    </router-link>
    <router-link to="/lists" class="router-link">
      <img src="../assets/images/list_icon.svg" class="icon" alt="List icon" />
      <h2>Lists</h2>
    </router-link>
  </div>
  <div class="page-footer--references">
    <div class="references-wrapper">
      <p class="name">Dusk Till Dark</p>
      <div class="sources">
        <img src="../assets/images/tmdb_logo.svg" alt="TMDB logo" />
        <img src="../assets/images/just_watch_logo.png" alt="JustWatch logo" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-footer--navbar {
  @include flex-row;
  align-items: center;
  position: fixed;
  z-index: 3;
  bottom: calc(16px + (2 * $spacing-med));
  left: 0;
  width: calc(100% - (2 * $spacing-med));
  background-color: $white;
  border-radius: $border-radius;
  height: $bar-height;
  margin: $spacing-med;

  .router-link {
    flex-basis: calc(100% / 3);
    @include flex-row($col-gap: $spacing-small);
    justify-content: center;
    color: $black;

    .icon {
      height: 24px;
    }
  }

  @include screen-size("screen-med") {
    @include flex-row(
      $col-gap: (
        $spacing-small * 5,
      )
    );
    justify-content: flex-end;
    bottom: inherit;
    left: inherit;
    top: calc(30px - $spacing-med);
    right: calc((100% - $width-screen-med) / 2);
    width: fit-content;
    background-color: transparent;
    border-radius: 0;
    height: auto;
    padding: 0 $spacing-med;

    .router-link {
      flex-basis: auto;
    }
  }
}

.page-footer--references {
  @include footer-gradient;
  position: fixed;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: calc(100% - (2 * $spacing-med));
  height: 16px;
  padding: $spacing-med;

  .references-wrapper {
    @include grid-view;
    grid-template-columns: 60px 1fr 60px;
    align-items: flex-end;

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

  @include screen-size("screen-med") {
    background: rgba(30, 31, 46, 0.3);
    height: calc($body-padding-bottom - (2 * $spacing-med));

    .references-wrapper {
      width: calc($width-screen-med - (2 * $spacing-med));
      height: calc($body-padding-bottom - (2 * $spacing-med));
      margin: 0 auto;
    }
  }
}
</style>
