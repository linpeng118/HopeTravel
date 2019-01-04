import Vuex from 'vuex'
import Vue from 'vue'
import common from './modules/common'
import getters from './getters'
Vue.use(Vuex)
const createStore = () => {
  return new Vuex.Store({
    modules: {
      common
    },
    getters
  })
}
export default createStore
