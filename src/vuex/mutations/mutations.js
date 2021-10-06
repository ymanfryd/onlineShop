export default {
    AUTHORIZE_USER: (state, value) => {
        state.isAuthorized = true
        state.currentUser = value
    },
    SET_USER: (state, value) => {
       state.users.push(value)
    },
    SET_SEARCH_VALUE_TO_VUEX: (state, value) => {
        state.searchValue = value
    },
    SWITCH_MOBILE: (state) => {
        state.isMobile = true
        state.isDesktop = false
    },
    SWITCH_DESKTOP: (state) => {
        state.isMobile = true
        state.isDesktop = false
    },
    SET_PRODUCTS_TO_STATE: (state, data) => {
        state.products = data.filter((item) => item.type === 'products')
        state.selectedByCategory = state.selectedProducts = state.products
        state.users =  data.filter((item) => item.type === 'users')
    },
    SET_CART: (state, product) => {
        let isProductExist = false
        state.cart.map(function (item) {
            if (item.attributes.article === product.attributes.article) {
                isProductExist = true
                item.attributes.quantity++
            }
        })
        isProductExist || state.cart.push({ ...product, quantity: 1 })

    },
    REMOVE_FROM_CART: (state, index) => {
        state.cart.splice(index, 1)
    },
    INCREMENT: (state, index) => {
        state.cart[index].quantity += 1
    },
    DECREMENT: (state, index) => {
        if (state.cart[index].quantity > 1) {
            state.cart[index].quantity -= 1
        }
    }

}