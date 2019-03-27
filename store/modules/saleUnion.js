export default {
  namespaced: true,
  state: {
    shareReport: {},
    friendReport: {},
    incomeReport: {}
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
    changeIncomeReport(state, data) {
      state.incomeReport = data
    },
  }
}
