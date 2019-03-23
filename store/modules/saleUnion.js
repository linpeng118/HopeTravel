export default {
  namespaced: true,
  state: {
    shareReport: {},
    friendReport: {}
  },
  actions: {
    // changeStatus({commit}, data) {
    //   commit('changeStatus', data)
    // }
  },
  mutations: {
    changeShareReport(state, data) {
      state.shareReport = data
    },
    changeFriendReport(state, data) {
      state.friendReport = data
    },
  }
}
