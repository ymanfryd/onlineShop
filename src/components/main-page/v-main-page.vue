<template>
  <div class="v-main-page">
    <h1 class="v-main-page__header" @click="clicked = !clicked" :class="{clickedHeader: clicked}">Online shop</h1>
    <h2>
      <router-link :to="{name: 'catalog'}">
        Go to catalog
      </router-link>
    </h2>
  </div>
</template>

<script>
export default {
  name: "v-main-page",
  data() {
    return{
      clicked: false
    }
  }
}
</script>

<style lang="scss">

.v-main-page {
  margin-top: 200px;

  &__header {
    font-size: 70px;
    cursor: pointer;
    &:hover {
      animation: pulse;
      animation-duration: 1s;
    }
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