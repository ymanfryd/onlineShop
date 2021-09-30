export default {
    SET_MOBILE({commit}) {
        commit ('SWITCH_MOBILE')
    },
    SET_DESKTOP({commit}) {
        commit ('SWITCH_DESKTOP')
    },
    ADD_TO_CART({commit}, product) {
        commit('SET_CART', product)
    },
    DELETE_FROM_CART({commit}, index) {
        commit('REMOVE_FROM_CART', index)
    },
    INCREMENT_CART_ITEM({commit}, index) {
        commit('INCREMENT', index)
    },
    DECREMENT_CART_ITEM({commit}, index) {
        commit('DECREMENT', index)
    },
    SELECT_PRODUCTS_BY_CATEGORY({commit}, category) {
        commit('SELECT_BY_CATEGORY', category)
    },
    SELECT_PRODUCTS_BY_PRICE({commit}, minPrice, maxPrice) {
        commit('SELECT_BY_PRICE',minPrice, maxPrice )
    },
}