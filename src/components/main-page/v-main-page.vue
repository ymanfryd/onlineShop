<template>
  <div class="v-main-page">
    <h1 class="v-main-page__header">Online shop</h1>
    <h2>
      <router-link :to="{name: 'catalog'}">
        Go to catalog
      </router-link>
    </h2>
  </div>
</template>

<script>
export default {
  name: "v-main-page"
}
</script>

<style lang="scss">

.v-main-page {
  margin-top: 200px;

  &__header {
    font-size: 70px;
  }

  a {
    text-decoration: none;
    color: #2c3e50;

    &:hover {
      color: $text-hover;
    }
  }

}


</style>