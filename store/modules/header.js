export default {
  namespaced: true,
  state: {
    headerStatus: 'top',
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
