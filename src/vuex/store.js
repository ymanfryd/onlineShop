import Vue from 'vue'
import Vuex from 'vuex'


import commonActions from "@/vuex/actions/actions";
import apiRequests from "@/vuex/actions/api-requests"
import mutations from "@/vuex/mutations/mutations";
import getters from "@/vuex/getters/getters";

const actions = {...commonActions, ...apiRequests}
Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    searchValue: '',
    isMobile: false,
    isDesktop: true,
    products: [],
    selectedByCategory: [],
    selectedProducts: [],
    cart: []
  },
  mutations,
  actions,
  getters,
});

export default store;
