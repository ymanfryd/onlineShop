<template>
<div class="v-main-page">
<h1>Online shop</h1>
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

<style scoped>

  .v-main-page {
    margin-top: 200px;
    text-decoration: none;
  }


</style>