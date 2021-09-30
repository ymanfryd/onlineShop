export default {
    IS_MOBILE(state) {
        return state.isMobile
    },
    IS_DESKTOP(state) {
        return state.isDesktop
    },
    PRODUCTS(state) {
        return state.products
    },
    CART(state) {
        return state.cart
    },
    SELECTED_PRODUCTS(state) {
        return state.selectedProducts
    },
    PRODUCTS_CATEGORIES(state) {
        let categories = []
        categories.push('all')
        for (let product of state.products) {
            if (!categories.includes(product.category)) {
                categories.push(product.category)
            }
        }

        return categories
    },

}