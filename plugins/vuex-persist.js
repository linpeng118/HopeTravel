// ~/plugins/vuex-persist.js
import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'tourscool_vuex',
      reducer(state) {
        return {
          // 本地化存储的store数据
          profile: state.profile.profile,
          reservePro: state.reservePro,
        }
      }
    })(store)
  })
}
