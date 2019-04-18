// import {
//   getFavoriteList
// } from "@/api/product.js";

export default {
  namespaced: true,
  state: {
    // test: {},
    // 需要预定的商品
    reservePro: {},
  },
  actions: {
  },
  mutations: {
    // setTest(state, data) {
    //   state.test = data
    // },
    // 保存产品详情
    saveReservePro(state, data) {
      state.reservePro = data
    },
  }
}
