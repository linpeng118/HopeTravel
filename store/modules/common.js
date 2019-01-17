export default {
  namespaced: true,
  state: {
    token: ''
  },
  actions: {
  },
  mutations: {
    updateToken(state, token) {
      state.token = token
    }
  }
}
