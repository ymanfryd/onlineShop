<template>
<div class="v-select">
  <p
      class="title"
      @click="areOptionsVisible = !areOptionsVisible"
  >
    {{selected}}</p>
  <div
      class="options"
      v-if="areOptionsVisible || isExpended"
  >
    <p
        v-for="(option, index) of options"
        :key="index"
        @click="selectOption(option)"
    >
      {{option}}
    </p>
  </div>
</div>
</template>

<script>
export default {
  name: "v-select",
  props: {
    options: {
      type: Array,
      default() {
        return []
      }
    },
    selected: {
      type: String,
      default() {
        return ''
      }
    },
    isExpended: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      areOptionsVisible: false
    }
  },
  methods: {
    selectOption(option) {
      this.$emit('select', option)
      this.areOptionsVisible = !this.areOptionsVisible
    },
    hideSelect(e) {
      if (!document.querySelector(".v-select") === e.target) {
        this.areOptionsVisible = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.hideSelect.bind(this), true)
  },
  beforeDestroy() {
    document.removeEventListener('click',this.hideSelect, true)
  }
}
</script>

<style lang="scss">
.v-select {

  width: 200px;
  margin-bottom: 20px;
  &:hover {
  box-shadow:  5px 0 5px $shadow-hover;

}
  .title{
    width: 100%;
    background: $card-bg;
    border-left: solid 5px $blue-bg;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      color: $text-hover;
    }

  }
  .options {
    border-left: solid 5px $blue-bg;
    width: 100%;
    background: $card-bg;
    cursor: pointer;
    p:hover {
      color: $text-hover;
    }
  }
  p {
    margin: 0;
  }
}
</style>