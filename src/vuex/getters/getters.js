export default {
    EMAILS(state) {
        let emails = [];
        for (let user of state.users) {
            emails.push(user.attributes.email)
        }
        return emails;
    },
    CURRENT_USER(state) {
      return state.currentUser[0]
    },
    IS_USER_AUTHORIZED(state) {
        return state.isAuthorized
    },
    USERS(state) {
      return state.users
    },
    SEARCH_VALUE(state) {
        return state.searchValue
    },
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