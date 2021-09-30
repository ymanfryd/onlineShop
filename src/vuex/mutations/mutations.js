export default {
    SWITCH_MOBILE: (state) => {
        state.isMobile = true
        state.isDesktop = false
    },
    SWITCH_DESKTOP: (state) => {
        state.isMobile = true
        state.isDesktop = false
    },
    SET_PRODUCTS_TO_STATE: (state, products) => {
        state.products = products
        state.selectedByCategory = state.selectedProducts = products

    },
    SET_CART: (state, product) => {
        let isProductExist = false
        state.cart.map(function (item) {
            if (item.article === product.article) {
                isProductExist = true
                item.quantity++
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
    },
    SELECT_BY_CATEGORY: (state, category) => {
        if (category === 'all') {
            state.selectedByCategory = state.products
        } else if (category !== 'select') {
        state.selectedByCategory = state.products.filter((product) =>
        product.category === category)
        }
    },
    SELECT_BY_PRICE: (state, [minPrice, maxPrice]) => {
        console.log(state.selectedByCategory)
        state.selectedProducts = state.selectedByCategory.filter((product) =>
            product.price >= minPrice && product.price <= maxPrice
        )

    }
}