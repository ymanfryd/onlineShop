<template>
<div class="v-main-wrapper">
  <keep-alive>
    <router-view/>
  </keep-alive>

</div>
</template>

<script>

export default {
  name: "v-main-wrapper",
  computed: {
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.v-main-wrapper {
  max-width: 900px;
  margin: 0 auto;
}
</style>