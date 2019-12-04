export default {
    namespaced: true,
    state: {
        profile: {}
    },

    mutations: {
        setProfile(state, data) {
            state.profile = data
        }
    }
}