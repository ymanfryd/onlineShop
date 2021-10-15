<template>
  <div class="popup-wrapper" ref="popupWrapper">
    <div class="v-popup" :class="{mobile_popup: IS_MOBILE}">
      <div class="v-popup__header">
        <span><h2>{{ popupTitle }}</h2></span>
        <span>
          <i
              class="material-icons"
              @click="closePopup"
          >close</i>
        </span>
      </div>
      <div class="v-popup__content">
        <slot></slot>
      </div>
      <div class="v-popup__footer">
        <button class="btn close_button" @click="closePopup">Close modal</button>
        <button
            class="btn "
            @click="rightBtnAction"
        >{{ rightBtnTitle }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "v-popup",
  props: {
    rightBtnTitle: {
      type: String,
      default: 'Ok'
    },
    popupTitle: {
      type: String,
      default: 'Popup name'
    },
  },
  computed: {
    ...mapGetters([
        "IS_MOBILE"
    ])
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
    },
    rightBtnAction() {
      this.$emit('rightBtnAction')
    }
  },
  mounted() {
    let vm = this
    document.addEventListener('click', (item) => {
      if (item.target === vm.$refs['popupWrapper']) {
        vm.closePopup()
      }
    })
  }
}
</script>

<style lang="scss">
.popup-wrapper {
  background-color: rgba(120, 120, 120, 0.52);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  height: 1500px;
}

.v-popup {
  padding: 16px;
  position: fixed;
  top: 50px;
  width: 400px;
  height: 600px;
  border-radius: 2%;
  background-color: #ffffff;
  box-shadow: 0 0 8px 0 rgba(151, 178, 239, 0.75);
  z-index: 10;

  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 480px;
  }

  .close_button {
    padding: 8px;
    color: #ffffff;
    background-color: #3d6188;
  }

  .material-icons {
    cursor: pointer;
  }

}
.mobile_popup {
  width: 250px;
  height: 500px;
  .v-popup__content {
    height: 360px;
  }
}
</style>