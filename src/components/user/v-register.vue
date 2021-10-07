<template>
  <div class="v-register">
    <form action="submit" @submit.prevent="registrationFormSubmitted()">
      <input
          type="text"
          placeholder="NAME"
          v-model="newUser.attributes.name"
      >
      <input
          type="email"
          placeholder="EMAIL"
          v-model="newUser.attributes.email"
      >
      <input
          type="password"
          placeholder="CREATE PASSWORD"
          v-model="newUser.attributes.password"
      >
      <input
          type="password"
          placeholder="CONFIRM PASSWORD"
          v-model="passwordConfirmation"
      >
      <p class="errors"
        v-for="(error, index) of errors"
         :key="index"
      >
        {{error}}
      </p>
      <button type="submit" >register</button>
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
      errors: [],
    }
  },
  computed: {
    ...mapGetters([
        "PRODUCTS",
        "USERS",
        "EMAILS"
    ])
  },

  methods: {
    ...mapActions([
        "SET_NEW_USER_TO_API",
        "SET_USER_TO_STATE",
        "MAKE_USER_AUTHORIZED"
    ]),

    registrationFormSubmitted() {

      this.newUser.id = `${this.PRODUCTS.length + this.USERS.length + 1}`
      if (this.EMAILS.includes(this.newUser.attributes.email)) {
        this.errors = []
        this.errors.push("User with this email is already registered")
      } else if (this.newUser.attributes.password !== this.passwordConfirmation) {
        this.errors = []
        this.errors.push("Passwords do not match")
      } else {
        this.SET_USER_TO_STATE(this.newUser)
        this.SET_NEW_USER_TO_API(this.newUser)
        this.MAKE_USER_AUTHORIZED([].push(this.newUser))
        this.$router.push('/catalog')
      }

    }
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
    }
  }
}
</style>