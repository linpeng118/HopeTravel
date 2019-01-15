export default {
  namespaced: true,
  state: {
    headerStatus: 0,
  },
  actions: {
    // changeStatus({commit}, data) {
    //   commit('changeStatus', data)
    // }
  },
  mutations: {
    changeStatus(state, data) {
      state.headerStatus = data
    }
  }
}
