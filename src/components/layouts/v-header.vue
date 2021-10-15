<template>
  <div class="v-header">

    <router-link :to="{name: 'mainPage'}">
      <img src="../../assets/logo.png" alt="logo">
    </router-link>
    <div class="btn_container">
    <button
        class="signInBtn signBtn"
        @click="SignInFormOpen"
        v-if="!IS_USER_AUTHORIZED"
        :class="{mobileBtn: !IS_DESKTOP}"
    >Sign in
    </button>
    <button
        class="signBtn"
        @click="GoToRegistration"
        v-if="!IS_USER_AUTHORIZED"
        :class="{mobileBtn: !IS_DESKTOP}"
    >Sign up
    </button>
  </div>
    <v-login v-if="isFormVisible"
             @closeSignForm="signed"
             @toRegistration="GoToRegistration"
    />
    <div class="welcome_text" v-if="IS_USER_AUTHORIZED">
      <h2
          class="welcome_string"
          :class="{mobileWelcome: !IS_DESKTOP}"
      >{{ userName }}</h2>
      <h4
          class="welcome_string logout"
          @click="logout"
          :class="{mobileLogout: !IS_DESKTOP}"
      >Logout</h4>
    </div>
    <form @submit.prevent="Search(searchValue)" v-if="IS_DESKTOP">

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
import vLogin from '../user/v-login'

export default {
  name: "v-header",
  data() {
    return {
      searchValue: '',
      isFormVisible: false
    }
  },

  components: {
    vLogin
  },
  computed: {
    ...mapGetters([
      "SEARCH_VALUE",
      "USERS",
      "IS_USER_AUTHORIZED",
      "CURRENT_USER",
      "IS_DESKTOP",
      "IS_POPUP_VISIBLE"
    ]),
    userName() {
      if (this.CURRENT_USER) {
        return 'Welcome, ' + this.CURRENT_USER.attributes.name
      }
      return ''
    },

  },
  methods: {
    ...mapActions([
      "GET_SEARCH_VALUE_TO_VUEX",
      "GET_PRODUCTS_FROM_API",
      "LOGOUT"
    ]),
    SignInFormOpen() {
      if (!this.USERS.length) {
        this.GET_PRODUCTS_FROM_API()
            .then((response) => {
              if (response.data) {
                this.isFormVisible = true
              }
            })
      } else {
        this.isFormVisible = true
      }

    },
    Search(value) {
      this.GET_SEARCH_VALUE_TO_VUEX(value)
      this.$router.push('/catalog')
    },
    resetSearchField() {
      this.searchValue = ''
      this.GET_SEARCH_VALUE_TO_VUEX(this.searchValue)
    },
    logout() {
      this.LOGOUT()
    },
    GoToRegistration() {
      this.isFormVisible = false
      this.$router.push('/registration')
    },
    signed() {
      this.isFormVisible = false
      this.$router.push('/catalog')
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

  .signBtn {
    background: none;
    font-size: 20px;
    color: white;
    border: none;
    box-shadow: 0 0 5px white;
    padding: 8px 20px;
    border-radius: 10px;
    position: relative;
    left: 5vw;
    cursor: pointer;
    &:hover {
      color: #c3f4ff;
    }
  }

  .signInBtn {
    box-shadow: none;
    &:hover {
      color: #c3f4ff;
    }
  }

  .mobileBtn {
    position: relative;
    transform: translateX(-80%);
  }

  .welcome_text {
    width: 80%;
  }

  .welcome_string {
    font-size: 1.4em;
    position: relative;
    color: white;
    margin: 0;
  }

  .logout {
    font-size: 1em;
    cursor: pointer;
    &:hover {
      color: #c3f4ff;
    }
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