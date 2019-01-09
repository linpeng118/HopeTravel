import * as apiLocalPlay from '../../pages/m2/api/local_play'

import {
  get as _get
} from 'lodash'

export default {
  namespaced: true,
  state: {
    hotActiveList: 0,
  },
  actions: {
    async getHotActive({
      commit
    }) {
      const resData = await apiLocalPlay.getHotActivities()
      commit('setHotActvie', resData.data)
    }
  },
  mutations: {
    setHotActvie(state, res) {
      console.log('setHotActvie', res)
      state.hotActiveList = (res || []).map(item => ({
        productId: _get(item, 'product_id'),
        siteId: _get(item, 'defaultPrice'),
        image: _get(item, 'image'),
        sales: _get(item, 'sales'),
        bookLimitDays: _get(item, 'book_limit_days'),
        name: _get(item, 'name'),
        price: _get(item, 'price'),
      }))
      console.log(state.hotActiveList)
    }
  }
}
