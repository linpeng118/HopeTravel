import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    /* your options */
    key: 'tourscool_vuex'
  })(store)
}
