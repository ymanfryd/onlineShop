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
    }
  },
  computed: {
    ...mapGetters([
        "PRODUCTS",
        "USERS"
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
      console.log (this.PRODUCTS)
      console.log (this.USERS)
      if (this.newUser.attributes.password === this.passwordConfirmation) {
        this.SET_USER_TO_STATE(this.newUser)
        this.SET_NEW_USER_TO_API(this.newUser)
        this.MAKE_USER_AUTHORIZED(this.newUser)
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