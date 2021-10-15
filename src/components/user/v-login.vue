<template>
  <div class="login-wrapper" ref="loginWrapper">
    <div class="v-login" :class="{mobileLogin: IS_MOBILE}">
      <form
          action="submit"
          @submit.prevent="SigningIn"
      >
        <input type="email" placeholder="EMAIL" v-model="user.email">
        <input type="password" placeholder="PASSWORD" v-model="user.password">
        <div
            class="errors"
            v-for="(error, index) in errors"
            :key="index"
        >{{ error }}
        </div>
        <button class="submit-btn" type="submit">SIGN IN</button>
        <div class="register_link" @click="toRegistration">
          <router-link to="/registration">register</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "v-login",
  data() {
    return {
      user: {
        "email": "",
        "password": "",
      },
      currentUser: {},
      errors: [],
    }

  },
  computed: {
    ...mapGetters([
      "PRODUCTS",
      "USERS",
        "IS_MOBILE"
    ])
  },

  methods: {
    ...mapActions([
      "SET_USER_TO_STATE",
      "SET_NEW_USER_TO_API",
      "MAKE_USER_AUTHORIZED",

    ]),
    CloseForm() {
      this.$emit("closeSignForm")

    },
    toRegistration() {
      this.$emit("toRegistration")
    },

    SigningIn() {

      this.currentUser = this.USERS.filter((user) => user.attributes.email === this.user.email)
      console.log(this.currentUser[0])
      if (this.currentUser.length) {
        if (this.currentUser[0].attributes.password === this.user.password) {
          localStorage.setItem("user_name", this.currentUser[0].attributes.name)
          localStorage.setItem("user_email", this.currentUser[0].attributes.email)
          localStorage.setItem("user_password", this.currentUser[0].attributes.password)
          localStorage.setItem("user_id", this.currentUser[0].id)
          this.MAKE_USER_AUTHORIZED(this.currentUser[0])
          this.$emit("closeSignForm")
        } else {
          this.errors = []
          this.errors.push("wrong password")
        }
      } else {
        this.errors = []
        this.errors.push("email not found")
      }
    }
  },
  mounted() {
    let vm = this
    document.addEventListener('click', (item) => {
      if (item.target === vm.$refs['loginWrapper']) {
        vm.CloseForm()
      }
    })
  }
}
</script>

<style lang="scss">
.login-wrapper {
  background-color: rgba(120, 120, 120, 0.52);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  height: 1500px;

  .v-login {

    position: fixed;
    top: 200px;
    background-color: white;
    width: 400px;
    height: 200px;
    padding: 20px;
    box-shadow: 0 0 2px $shadow-hover;
    form {
      display: flex;
      flex-direction: column;
    }

    input {
      height: 30px;
      margin: 10px;
      border: none;
      border-bottom: 1px solid #225a83;
      color: #2c3e50;
      display: block;

      &:active {
        display: block;
        border: none;
        background: #787878;
      }
    }

    .submit-btn {
      margin: 20px 150px;
      height: 25px;
      color: #efefef;
      background-color: $blue-bg;
      border: none;
      box-shadow: 0 0 5px #2c3e50;
    }
  }
.mobileLogin {
  width: 250px;
  .submit-btn {
    margin: 20px 50px;
  }
}
}

</style>