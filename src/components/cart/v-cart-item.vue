<template>
<div class="v-cart-item">
  <img class="v-cart-item__image" :src=" require('../../assets/images/' + cart_item_data.image)" alt="Product image">
  <div class="v-cart-item__info">
    <p>{{cart_item_data.name}}</p>
    <p>{{cart_item_data.price}}</p>
    <p>{{cart_item_data.article}}</p>
  </div>
  <div class="v-cart-item__quantity">
    <p>Quantity: </p>
    <span>
      <span class="quantity__button" @click="decrementItem">-</span>
    {{cart_item_data.quantity}}
      <span class="quantity__button" @click="incrementItem">+</span>

    </span>
  </div>
  <button class="btn" @click="deleteFromCart">Delete</button>
</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "v-cart-item",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {

    deleteFromCart() {
      this.$emit('deleteFromCart')
    },
    incrementItem() {
      this.$emit('increment')
    },
    decrementItem() {
      this.$emit('decrement')
    },
  },
  mounted() {
  this.$set(this.cart_item_data, 'quantity', 1)
  }
}
</script>

<style lang="scss">
.v-cart-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  background: #f5f5f5;
  box-shadow: 0 0 8px 0 rgba(151, 178, 239, 0.75);

  padding: $padding*2;
  margin-bottom: $margin*2;
  &__image {
    max-width: 100px;
  }
  .quantity__button {
    cursor: pointer;
  }
}
</style>