<template>
<div class="v-main-wrapper">
  <v-header />
  <keep-alive>
    <router-view/>
  </keep-alive>

</div>
</template>

<script>
import vHeader from './layouts/v-header'

export default {
  name: "v-main-wrapper",
  computed: {
  },
  data() {
    return {}
  },
  components: {
    vHeader
  },
}
</script>

<style scoped>
.v-main-wrapper {

  margin: 0 auto;
}
</style>