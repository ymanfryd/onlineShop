<template>
<div class="v-cart">
  <router-link :to="{name: 'catalog'}">
    <div class="v-catalog__link_to_cart">Back to catalog</div>
  </router-link>
  <h1 :class="{mobileHeader: IS_MOBILE}">Cart</h1>
  <p v-show="!cart_data.length">There are no products in cart...</p>
  <v-cart-item
    v-for="(item, index) in cart_data"
    :key="index"
    :cart_item_data="item"
    @deleteFromCart="deleteFromCart(index)"
    @increment="increment(index)"
    @decrement="decrement(index)"
  />
  <div class="v-cart__total">
    <p class="total__name">Total</p>
    <p>{{cartTotalCost | toFix}}$</p>
  </div>
</div>
</template>

<script>
import vCartItem from './v-cart-item'
import {mapActions, mapGetters} from 'vuex'
import toFix from "@/filters/toFix";


export default {
  name: "v-cart",
  components: {
    vCartItem
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  filters: {
    toFix
  },
  computed: {
    ...mapGetters([
        "IS_MOBILE"
    ]),
    cartTotalCost() {
      let result = []
      for (let item of this.cart_data) {
        result.push(item.attributes.price * item.quantity)
      }
      result = result.length ? result.reduce((sum, el) => {
        return sum + el
      }) : 0
          return result
    },

  },
  methods: {
    ...mapActions([
        "DELETE_FROM_CART",
        "INCREMENT_CART_ITEM",
        "DECREMENT_CART_ITEM"

    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index)
    },
    increment(index) {
      this.INCREMENT_CART_ITEM(index)
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index)
    }
  }
}
</script>

<style lang="scss">
.v-cart {
  padding-top: 20px;
  margin-bottom: 120px;
  &__total {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: $padding*2 $padding*3;
    display: flex;
    justify-content: center;
    background-color: $blue-bg;
    color: #ffffff;
    font-size: 20px;
    box-shadow: 0 0 10px $shadow-hover;
  }
  .total__name {
    margin-right: $margin*2 ;
  }
  .mobileHeader {
    width: 40%;
  }
}

</style>