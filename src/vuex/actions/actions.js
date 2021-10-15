export default {
    LOGOUT({commit}) {
        commit('LOGOUT_USER')
    },
    MAKE_USER_AUTHORIZED({commit}, value) {
        commit('AUTHORIZE_USER', value)
    },
    SET_USER_TO_STATE({commit}, value) {
        commit('SET_USER', value)
    },
    GET_SEARCH_VALUE_TO_VUEX({commit}, value) {
        commit('SET_SEARCH_VALUE_TO_VUEX', value)
    },
    SET_MOBILE({commit}) {
        commit('SWITCH_MOBILE')
    },
    SET_DESKTOP({commit}) {
        commit('SWITCH_DESKTOP')
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
    CHANGE_POPUP_STATUS({commit}) {
        commit('CHANGE_POPUP')
    }
}