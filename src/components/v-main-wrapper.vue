<template>
<div class="v-main-wrapper">
  <v-header v-if="!IS_POPUP_VISIBLE"/>
  <keep-alive>
    <router-view/>
  </keep-alive>

</div>
</template>

<script>
import vHeader from './layouts/v-header'
import {mapGetters} from 'vuex'

export default {
  name: "v-main-wrapper",
  data() {
    return {}
  },
  components: {
    vHeader
  },
  computed: {
    ...mapGetters([
        "IS_POPUP_VISIBLE"
    ])
  }
}
</script>

<style scoped>
.v-main-wrapper {

  margin: 0 auto;
}
</style>