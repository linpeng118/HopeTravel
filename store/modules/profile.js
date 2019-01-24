import {
  getProfile
} from "@/api/profile.js";

export default {
  namespaced: true,
  state: {
    profile: {}
  },
  actions: {
    async getProfile({
      commit
    }, subData) {
      let res = await getProfile()
      return res
      // commit('setProfile', data)
    }
  },
  mutations: {
    setProfile(state, data) {
      state.profile = data
    }
  }
}
