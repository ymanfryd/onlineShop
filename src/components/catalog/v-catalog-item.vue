<template>
  <div class="v-catalog-item"
  >
    <v-popup
        v-show="isInfoPopupVisible"
        @closePopup="closePopupInfo"
        rightBtnTitle="Add to cart"
        :popupTitle="product_data.name"
        @rightBtnAction="addToCart"
    >
      <img class="v-catalog-item__image"
           :src="CurrentPopupImgUrl"
           alt="product image"
      >
      <i
          class="material-icons arrow_back_ios"
          @click="changeImgBack"
      ></i>
      <i
          class="material-icons arrow_forward_ios"
          @click="changeImgForward"
      ></i>
      <div class="">
        <h2 class="v-catalog-item__name">{{ product_data.name }}</h2>
        <h4 class="v-catalog-item__prise">Price: {{ product_data.price | toFix }}</h4>
        <p class="v-catalog-item__prise"> {{ product_data.category }} </p>
      </div>

    </v-popup>
    <img v-if="!isImgHovered" class="v-catalog-item__image"
         :src=" require('../../assets/images/' + product_data.images[0])"
         alt="product image"
         @mouseenter="isImgHovered = !isImgHovered"
    >
    <img v-else class="v-catalog-item__image"
         :src=" require('../../assets/images/' + product_data.images[1])"
         alt="product image"
         @mouseleave="isImgHovered = !isImgHovered"
    >
    <div class="product-info">
      <h2 class="v-catalog-item__name">{{ product_data.name }}</h2>
      <p class="v-catalog-item__prise">Price: {{ product_data.price | toFix }}</p>

      <h4 class="info_btn"
          @click="showPopupInfo"
      >Show info</h4>
      <button class="btn"
              @click="addToCart"
      >Add to cart
      </button>

    </div>
  </div>
</template>

<script>
import vPopup from '../popup/v-popup'
import toFix from "@/filters/toFix";

export default {
  name: "v-catalog-item",
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    },
    isDesktop: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  components: {
    vPopup
  },
  data() {
    return {
      isImgHovered: false,
      currentPopupImg: 0,
      isInfoPopupVisible: false,
    }
  },
  filters: {
    toFix
  },
  methods: {
    addToCart() {
      this.$emit('addToCart', this.product_data)
    },
    showPopupInfo() {
      this.isInfoPopupVisible = true
    },
    closePopupInfo() {
      this.isInfoPopupVisible = false
    },
    changeImgForward() {
      if (this.currentPopupImg < this.product_data.images.length - 1) {
        this.currentPopupImg += 1;
      } else {
        this.currentPopupImg = 0;
      }
    },
    changeImgBack() {
      if (this.currentPopupImg > 0) {
        this.currentPopupImg -= 1;
      } else {
        this.currentPopupImg = this.product_data.images.length - 1;
      }
    }
  },
  computed: {
    CurrentPopupImgUrl() {
      return require('../../assets/images/'  + this.product_data.images[this.currentPopupImg])
    }
  }


}
</script>

<style lang="scss">
.v-popup {
  height: 700px;
  img {
    width: 400px;
  }
  .arrow_back_ios,
  .arrow_forward_ios{
    position: absolute;
    bottom: 400px;
    color: #2c3e50;
    &:hover {
      color: $text-hover;
    }
  }
  .arrow_back_ios {
    left: 20px;
  }
  .arrow_forward_ios {
    right: 20px;
  }
}

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

  .product-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      padding: 0;
      margin: 0;
    }
  }

  .info_btn {
    cursor: pointer;

    &:hover {
      color: $text-hover;
    }
  }
}
</style>