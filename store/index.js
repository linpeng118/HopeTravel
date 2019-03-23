import Vuex from 'vuex'
import Vue from 'vue'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
// 模块
import common from './modules/common'
import header from './modules/header'
import localPlay from './modules/localPlay'
// 确认订单
import confirm from './modules/confirm'
// 产品模块
import product from './modules/product'
// 个人信息
import profile from './modules/profile'
// login模块
import login from './modules/login'
// 分享模块
import saleUnion from './modules/saleUnion'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules: {
      common,
      header,
      localPlay,
      confirm,
      product,
      profile,
      login,
      saleUnion,
    },
  })
}

export default createStore
