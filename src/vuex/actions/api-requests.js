import axios from "axios";

export default {
    GET_PRODUCTS_FROM_API({commit}) {
        return axios('http://localhost:3000/data', {
            method: "GET"
        })
            .then((products) => {
                commit('SET_PRODUCTS_TO_STATE', products.data)
                return products;
            })
            .catch((error) => {
                console.log(error)
                return error
            })
    },
    SET_NEW_USER_TO_API({commit}, user) {
        return axios.post('http://localhost:3000/data', user)
    },
    UPDATE_USER_CART({commit}, user) {
        return axios.put('http://localhostl:3000/data', {id: user.id})
            .then((response) => {
                commit('UPDATE_CART', response)
            })
            .catch((error) => {
                console.log(error)
                return error
            })

    }
}
