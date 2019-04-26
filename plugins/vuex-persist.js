
import createPersistedState from 'vuex-persistedstate'
export default ({store}) => {
  window.onNuxtReady(() => {
    // 本地化存储的store数据
    createPersistedState({
      key: 'tourscool_vuex',
      paths: [
        // product模块的reservePro数据
        'product.reservePro',
        // 用户信息
        'profile.profile'
      ],
      // 下面也是可行的
      // reducer(state) {
      //   return {
      //     product: {
      //       reservePro: state.product.reservePro
      //     },
      //   }
      // }
    })(store)
  })
}
