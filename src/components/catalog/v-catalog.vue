<template>
  <div class="v-catalog-wrapper">
    <div class="v-catalog">

      <router-link :to="{name: 'cart', params: {cart_data: CART}}">
        <div class="v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
      </router-link>

      <h1 :class="{movedHeader:IS_MOBILE}"
      >Catalog</h1>
      <div class="filters">
        <v-select
            :options="categories"
            :selected="selected"
            @select="sortByCategories"
            :class="{mobileSelect: IS_MOBILE}"
        />

        <div class="range-slider" :class="{mobileSlider: IS_MOBILE}">
          <input
              type="range"
              min="0"
              max="100"
              step="1"
              v-model.number="minPrice"
              @change="setRangeSliders"
              :class="{mobileSlider: IS_MOBILE}"
          />
          <input
              type="range"
              min="0"
              max="100"
              step="1"
              v-model.number="maxPrice"
              @change="setRangeSliders"
              :class="{mobileSlider: IS_MOBILE}"
          />
          <div class="range-values" :class="{mobileRange: IS_MOBILE}">
            <p>Min: {{ minPrice }} </p>
            <p>Max: {{ maxPrice }} </p>
          </div>
        </div>

      </div>
      <div class="v-catalog__list">
        <h3 v-if="!sortedProducts.length">Nothing found
          <br>
          <div
              class="back-to-catalog"
              @click="resetCatalog()"
          > back to catalog
          </div>
        </h3>
        <v-catalog-item v-for="product in sortedProducts"
                        :key="product.attributes.article"
                        :product_data="product"
                        @addToCart="addToCart"
        ></v-catalog-item>
      </div>


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
      sortedProducts: [],
      categories: [
        "Men",
        "Women",
        "All"
      ],
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
      "IS_DESKTOP",
      "SEARCH_VALUE",
    ]),
    filteredProducts() {
      if (this.sortedProducts.length) {
        return this.sortedProducts
      } else {
        return this.PRODUCTS
      }

    }
  },
  methods: {
    ...mapActions([
      "GET_PRODUCTS_FROM_API",
      "ADD_TO_CART",
    ]),

    addToCart(data) {
      this.ADD_TO_CART(data)
    },
    sortByCategories(category) {
      let vm = this
      this.sortedProducts = [...this.PRODUCTS]
      this.sortedProducts = this.sortedProducts.filter((product) => {
        return product.attributes.price >= vm.minPrice && product.attributes.price <= vm.maxPrice
      })
      if (category) {
        vm.selected = category
      }
      if (vm.selected === 'Men' || vm.selected === 'Women') {
        this.sortedProducts = this.sortedProducts.filter((product) => {
          return product.attributes.category === vm.selected
        })
      }
    },
    setRangeSliders() {
      if (this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice
        this.maxPrice = this.minPrice
        this.minPrice = tmp
      }
      this.sortByCategories()
    },
    sortProductsBySearchValue(value) {
      if (value) {
        this.sortedProducts = this.PRODUCTS
        this.sortedProducts = this.sortedProducts.filter((item) => {
          return item.attributes.name.toLowerCase().includes(value.toLowerCase())
        })

      } else {
        this.sortedProducts = this.PRODUCTS
      }
      this.selected = 'all'
      this.minPrice = 0
      this.maxPrice = 100

    },
    resetCatalog() {
      this.sortedProducts = this.PRODUCTS
      this.minPrice = 0
      this.maxPrice = 100
      this.selected = 'all'
    }

  },
  watch: {
    SEARCH_VALUE() {
      this.sortProductsBySearchValue(this.SEARCH_VALUE)
    }
  },

  mounted() {
    this.GET_PRODUCTS_FROM_API()
        .then((response) => {
          if (response.data) {
            this.sortByCategories()
            this.sortProductsBySearchValue(this.SEARCH_VALUE)
          }
        })
  }
}
</script>

<style lang="scss">

.v-catalog {
  margin-top: 120px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  &__link_to_cart {
    position: absolute;
    right: 20px;
    padding: 6px 16px;
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

  .back-to-catalog {
    margin-top: 20px;
    cursor: pointer;

    &:hover {
      color: $text-hover;
    }
  }

  .movedHeader {
    width: 50%;
  }
.mobileSelect {
  width: 40vw;
}

  .filters {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .range-values {
    display: flex;

    p {
      padding: 20px;
      position: relative;

      right: 25%;
      top: 30px;
    }
  }

  .range-slider input[type=range], {
    position: absolute;
    right: 5%;
    top: 230px;
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
    height: 15px;
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
    width: 15px;
    height: 15px;
    background: white;
    border: 0.2px solid rgba(9, 75, 129, 0.75);
    border-radius: 50%;
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

  .mobileRange {
    //width: 40vw;

    p {
      padding: 5px;
      font-size: 0.8em;
      right: 50px;
      top: 0;
    }

  }
  .mobileSlider input[type=range]{
    top: 180px;
  }

}
</style>