<template>
  <div class="v-catalog">

      <router-link :to="{name: 'cart', params: {cart_data: CART}}">
        <div class="v-catalog__link_to_cart">Cart: {{CART.length}} </div>
      </router-link>

  <h1>Catalog</h1>
    <div class="filters">
    <v-select
    :options="PRODUCTS_CATEGORIES"
    :selected="selected"
    @select="optionSelect"
    />

    <div class="range-slider">
      <input
          type="range"
          min="0"
          max="100"
          step="1"
          v-model.number="minPrice"
          @change="setRangeSliders"
      />
      <input
          type="range"
          min="0"
          max="100"
          step="1"
          v-model.number="maxPrice"
          @change="setRangeSliders"
      />
    </div>
      <div class="range-values">
        <p>Min: {{minPrice}}</p>
        <p>Max: {{maxPrice}}</p>
      </div>
    </div>
  <div class="v-catalog__list">
  <v-catalog-item v-for="product in SELECTED_PRODUCTS"
                  :key="product.article"
                  :product_data="product"
                  @addToCart="addToCart"
  ></v-catalog-item>
  </div>


</div>
</template>

<script>
import vCatalogItem from './v-catalog-item'
import {mapActions, mapGetters} from 'vuex'
import vSelect from '../v-select'

export default {
  name: "v-catalog",
  components: {
    vCatalogItem,
    vSelect
  },
  data() {
    return {
      selected: 'select',
      minPrice: 0,
      maxPrice: 100
    }
  },
  computed: {
    ...mapGetters([
        "PRODUCTS",
        "CART",
        "PRODUCTS_CATEGORIES",
        "SELECTED_PRODUCTS",
        "IS_MOBILE",
        "IS_DESKTOP"
    ]),
  },
  methods: {
    ...mapActions([
        "GET_PRODUCTS_FROM_API",
        "ADD_TO_CART",
        "SELECT_PRODUCTS_BY_CATEGORY",
        "SELECT_PRODUCTS_BY_PRICE"
    ]),

    addToCart(data) {
      this.ADD_TO_CART(data)
    },
    optionSelect(option) {
      this.selected = option;
      this.SELECT_PRODUCTS_BY_CATEGORY(option)
      this.SELECT_PRODUCTS_BY_PRICE([this.minPrice, this.maxPrice])
    },
    setRangeSliders() {
      if (this.minPrice > this.maxPrice){
        let tmp = this.maxPrice
        this.maxPrice = this.minPrice
        this.minPrice = tmp
      }
      this.SELECT_PRODUCTS_BY_CATEGORY(this.selected)
      this.SELECT_PRODUCTS_BY_PRICE([this.minPrice, this.maxPrice])
    }
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
    .then((response) => {
      if(response.data) {
        console.log('data arrived')
      }
    })
  }
}
</script>

<style lang="scss">
  .v-catalog {
&__list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
  }
    &__link_to_cart {
      position: absolute;
      top: 10px;
      right: 10px;
      padding:  6px 16px;
      border-left: 5px solid #45a0e1;
      color: #2c3e50;
      background-color: $card-bg;
      text-transform: uppercase;
      font-weight: bold;
      &:hover {
        color: $text-hover;
        box-shadow: 0 0 5px 0 $shadow-hover;
      }
      &:active {
        box-shadow: 0 0 3px 0 #45a0e1;
        font-size: 15px;
      }
    }
    .filters {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .range-slider input[type=range] {
      position: absolute;
      left: 55%;
      top: 180px;
    }
    ::-webkit-slider-thumb {
      z-index: 2;
      position: relative;
      top: 2px;
      margin-top: -7px;
    }

    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      height: 5px;
      box-shadow: 1px 1px 1px #C6C6C6, 0px 0px 1px #787878;
      border-radius: 2px;
      border: 0.2px solid #787878;
    }
    input[type=range] {
      margin: 7.65px 0;
      background-color: transparent;
      -webkit-appearance: none;
    }
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      background: #49839c;
      border: 0;
      border-radius: 0.9px;

      height: 3.7px;
      cursor: pointer;
    }
    input[type=range]::-webkit-slider-thumb {
      margin-top: -7.65px;
      width: 5px;
      height: 15px;
      background: $text-hover;
      cursor: pointer;
      -webkit-appearance: none;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
      background: #629db6;
    }
    input[type=range]::-moz-range-track {
      background: #49839c;
      border: 0;
      border-radius: 0.9px;
      height: 3.7px;
      cursor: pointer;
    }
    input[type=range]::-moz-range-thumb {
      width: 4px;
      height: 19px;
      background: $blue-bg;
      cursor: pointer;
    }
    input[type=range]::-ms-track {
      background: transparent;
      border-color: transparent;
      border-width: 8.15px 0;
      color: transparent;

      height: 3.7px;
      cursor: pointer;
    }
    input[type=range]::-ms-fill-lower {
      background: #396679;
      border: 0;
      border-radius: 1.8px;
    }
    input[type=range]::-ms-fill-upper {
      background: #49839c;
      border: 0;
      border-radius: 1.8px;
    }
    input[type=range]::-ms-thumb {
      width: 4px;
      height: 19px;
      background: $blue-bg;
      cursor: pointer;
      margin-top: 0px;
    }
    input[type=range]:focus::-ms-fill-lower {
      background: #49839c;
    }
    input[type=range]:focus::-ms-fill-upper {
      background: #629db6;
    }

  }
</style>