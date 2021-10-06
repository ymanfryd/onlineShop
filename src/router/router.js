import Vue from 'vue'
import Router from 'vue-router'

import vCatalog from '../components/catalog/v-catalog'
import vCart from '../components/cart/v-cart'
import vMainPage from '../components/main-page/v-main-page'
import vRegistration from '../components/user/v-register'

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: vMainPage
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: vCatalog
    },
    {
      path: '/cart',
      name: 'cart',
      component: vCart,
      props: true
    },
    {
      path: '/registration',
      name: 'registration',
      component: vRegistration
    }
  ]
})

export default router;
