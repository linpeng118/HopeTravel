// import {
//   getFavoriteList
// } from "@/api/product.js";

export default {
  namespaced: true,
  state: {
    // 需要预定的商品
    reservePro: {}
  },
  actions: {
  },
  mutations: {
    saveReservePro(state, data) {
      state.reservePro = data
    }
  }
}
