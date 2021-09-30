<template>
<div class="v-catalog-item"
     >
  <img v-if="!isImgHovered" class="v-catalog-item__image"
       :src=" require('../../assets/images/' + product_data.image)"
       alt="product image"
       @mouseenter="isImgHovered = !isImgHovered"
  >
  <img v-else class="v-catalog-item__image"
       :src=" require('../../assets/images/' + product_data.hoverImage)"
       alt="product image"
       @mouseleave="isImgHovered = !isImgHovered"
  >
  <p class="v-catalog-item__name">{{product_data.name}}</p>
  <p class="v-catalog-item__prise">Price: {{product_data.price.toFixed()}} $</p>
  <button class="v-catalog-item__add_to_cart_btn btn"
          @click="addToCart"

  >Add to cart</button>
</div>
</template>

<script>
export default {
  name: "v-catalog-item",
  props: {
    product_data: {
      type: Object,
      default() {
        return {
        }
      }
    }
  },
  data() {
    return{
      isImgHovered: false
    }
  },
  methods: {
    addToCart() {
      this.$emit('addToCart',this.product_data)
    },

  },

}
</script>

<style lang="scss">
  .v-catalog-item {
    background: #fff;
    flex-basis: 25%;
    border-radius: 2%;
    box-shadow: 0 0 8px 0 rgba(151, 178, 239, 0.75);
    padding: $padding*2;
    margin-bottom: $margin*2;
  &__image {
     width: 200px;
   }

  }
</style>