<template>
  <div class="v-header">

    <router-link :to="{name: 'mainPage'}">
      <img src="../../assets/logo.png" alt="logo">
    </router-link>

    <form @submit.prevent="Search(searchValue)">

      <input
        type="text"
        class="form__field"
        placeholder="Search"
        name="name"
        id='name'
        v-model="searchValue"
        @submit="Search(searchValue)"
    />

    <label for="name" class="form__label" @click="Search(searchValue)">Search</label>
      <h4 class="reset_btn" @click="resetSearchField">reset</h4>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "v-header",
  data() {
    return {
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters([
      "SEARCH_VALUE"
    ])
  },
  methods: {
    ...mapActions([
      "GET_SEARCH_VALUE_TO_VUEX"
    ]),
    Search(value) {
      this.GET_SEARCH_VALUE_TO_VUEX(value)
      this.$router.push('/catalog')
    },
    resetSearchField() {
      this.searchValue = ''
      this.GET_SEARCH_VALUE_TO_VUEX(this.searchValue)
    }
  }
}
</script>

<style lang="scss">
.v-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $blue-bg;
  padding: 16px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 0 10px $shadow-hover;

  img {
    width: 60px;
  }

  .form__group {
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 50%;
  }

  .form__field {
    font-family: inherit;
    border: 0;
    border-bottom: 2px solid #f6f6f6;
    outline: 0;
    font-size: 1.3rem;
    color: white;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    position: relative;
    right: 50px;
    width: 300px;

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ .form__label {
      font-size: 1.3rem;
      cursor: text;
      top: 20px;
    }
  }

  .form__label {
    position: absolute;
    top: 0;
    right: 250px;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: #ffffff;
    cursor: pointer;
  }

  .form__field:focus {
    ~ .form__label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: #7ee2ef;
      font-weight: 700;
    }

    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #3fbeff, #ffffff);
    border-image-slice: 1;
  }
}
  .reset_btn {
    position: absolute;
    top: 3px;
    right: 70px;
    color: white;
    cursor: pointer;
  }



</style>