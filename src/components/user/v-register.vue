<template>
  <div class="v-register">
    <form action="submit" @submit.prevent="registrationFormSubmitted()">
      <input
          type="text"
          placeholder="NAME"
          @click="validateName"
          @input="validateName"
          :class="{mobileInput: IS_MOBILE}"
          v-model="newUser.attributes.name"
      >
      <div class="errors">
        <p class="error" v-if="errors.name.length">{{ errors.name[0] }}</p>
      </div>
      <input
          type="email"
          placeholder="EMAIL"
          @click="validateEmail"
          @input="validateEmail"
          :class="{mobileInput: IS_MOBILE}"
          v-model="newUser.attributes.email"
      >
      <p class="error" v-if="errors.email.length">{{ errors.email[0] }}</p>
      <input
          type="password"
          placeholder="CREATE PASSWORD"
          v-model="newUser.attributes.password"
          @click="validatePassword"
          @input="validatePassword"
          :class="{mobileInput: IS_MOBILE}"
      >
      <input
          type="password"
          placeholder="CONFIRM PASSWORD"
          v-model="passwordConfirmation"
          @click="validatePassword"
          @input="validatePassword"
          :class="{mobileInput: IS_MOBILE}"
      >
      <p class="error" v-if="errors.password.length">{{ errors.password[0] }}</p>
      <button :class="{disabled_btn: dataIncorrect}" type="submit" :disabled="dataIncorrect">
        register
      </button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "v-register",
  data() {
    return {
      newUser: {
        "type": "users",
        "id": "0",
        "attributes": {
          "name": "",
          "email": "",
          "password": "",
          "cart": [],
        }
      },
      passwordConfirmation: '',
      errors: {
        name: [name],
        email: [name],
        password: [name]
      },
      dataIncorrect: true
    }
  },
  computed: {
    ...mapGetters([
      "PRODUCTS",
      "USERS",
      "EMAILS",
      "IS_MOBILE"
    ])
  },

  methods: {
    ...mapActions([
      "SET_NEW_USER_TO_API",
      "SET_USER_TO_STATE",
      "MAKE_USER_AUTHORIZED",
      "GET_PRODUCTS_FROM_API"
    ]),

    validateName() {

      if (this.newUser.attributes.name.trim().length < 16) {
        this.errors.name = []

        if (this.newUser.attributes.name.trim().length) {
          this.errors.name = []
          this.checkData()
        } else {
          this.errors.name = []
          this.errors.name.push('This field is required')
        }

      } else {
        this.errors.name.push('Name must not be longer 15 symbols')
        this.checkData()
      }
    },

    validateEmail() {
      let regular = /\S+@\S+\.\S+/;
      if (this.newUser.attributes.email.trim().length) {
        this.errors.email = []
        if (regular.test(this.newUser.attributes.email)) {
          this.errors.email = []
          if (!this.EMAILS.includes(this.newUser.attributes.email)) {
            this.errors.email = []
            this.checkData()
          } else {
            this.errors.email.push('User with this email is already registered')
            this.checkData()
          }
        } else {
          this.errors.email.push('Email must be a valid email')
          this.checkData()
        }
      } else {
        this.errors.email = []
        this.errors.email.push('This field is required')
        this.checkData()
      }
    },

    validatePassword() {
      if (this.newUser.attributes.password.trim().length) {
        this.errors.password = []
        if (this.newUser.attributes.password === this.passwordConfirmation) {
          this.errors.password = []
          this.checkData()
        } else {
          this.errors.password.push('Passwords do not match')
          this.checkData()
        }
      } else {
        this.errors.password = []
        this.errors.password.push('This field is required')
        this.checkData()
      }
    },

    checkData() {
      this.dataIncorrect = (!!this.errors.name.length || !!this.errors.email.length || !!this.errors.password.length);
    },

    registrationFormSubmitted() {
      this.checkData()
      this.newUser.id = `${this.PRODUCTS.length + this.USERS.length + 1}`
      this.SET_USER_TO_STATE(this.newUser)
      this.SET_NEW_USER_TO_API(this.newUser)
          .then((res) => {
            console.log(this.newUser.name)
            localStorage.setItem("user_name", this.newUser.attributes.name)
            localStorage.setItem("user_email", this.newUser.attributes.email)
            localStorage.setItem("user_password", this.newUser.attributes.password)
            localStorage.setItem("user_id", this.newUser.id)
            this.MAKE_USER_AUTHORIZED(this.newUser)
            this.$router.push('/catalog')
          })

    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
  }
}
</script>

<style lang="scss">
.v-register {
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 150px;

    input {
      padding: 10px;
      margin: 10px;
      border: none;
      box-shadow: 0 0 50px #c3c3c3;
      border-radius: 100px;
      width: 30%;
    }

    .mobileInput {
      width: 50%;
    }

    button {
      margin-top: 50px;
      padding: 10px 40px;
      border: 3px solid white;
      border-radius: 100px;
      background: #58a2b5;
      font-family: inherit;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1em;
      color: white;
    }

    .disabled_btn {
      background: #a0aeb2;
    }

    .error {
      margin: 0;
      color: darkred;
    }
  }
}
</style>