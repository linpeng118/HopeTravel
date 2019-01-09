import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
// 模块
import common from './modules/common'
import header from './modules/header'

Vue.use(Vuex)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      common,
      header
    },
    getters,
    actions,
    mutations
  })
}

// 热更新
if (module.hot) {
  module.hot.accept([
    // state不支持热更新
    './getters',
    './actions',
    './mutations',
    './modules/common',
    './modules/header',
  ], () => {
    store.hotUpdate({
      // 获取更新后的模块。因为 babel 6 的模块编译格式问题，这里需要加上 .default
      getters: require('./getters').default,
      actions: require('./actions').default,
      mutations: require('./mutations').default,
      modules: {
        common: require('./modules/common').default,
        header: require('./modules/header').default,
      }
    })
  })
}
export default createStore
