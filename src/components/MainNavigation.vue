<template>
  <div class="page-footer">
    <div class="page-footer__navbar">
      <p>smth</p>
    </div>
    <div class="page-footer__references">
      <p class="name">Dusk Till Dark</p>
      <div class="sources">
        <img src="../assets/images/tmdb_logo.svg" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$navbar-height: 50px;

.page-footer {
  position: fixed;
  bottom: 0;
  width: 100vw;

  &__navbar {
    background-color: $white;
    border-radius: $border-radius;
    height: $navbar-height;
    margin: $spacing-med;
  }

  &__references {
    @include footer-gradient;
    @include grid-view;
    grid-template-columns: 1fr 1fr 1fr;
    padding: $spacing-med;

    .name {
      grid-column-start: 2;
      grid-column-end: 3;
      color: $purple-light;
    }

    .sources {
      grid-column-start: 3;
      grid-column-end: 4;
      justify-self: end;

      img {
        height: 16px;
      }
    }
  }
}
</style>
