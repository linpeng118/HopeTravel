
import createPersistedState from 'vuex-persistedstate'
export default ({store}) => {
  createPersistedState({
    key: 'tourscool_vuex',
    reducer(state) {
      return {
        // 本地化存储的store数据
        // profile: state.profile,
        reservePro: state.reservePro,
      }
    }
  })(store)
}
