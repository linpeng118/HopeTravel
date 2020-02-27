export default {
    namespaced: true,
    state: {
        profile: {},
        national: "", //保存国家
    },

    mutations: {
        setProfile(state, data) {
            state.profile = data
        },
        //保存国家
        saveNational(state, data) {
            state.national = data
        }
    }
}