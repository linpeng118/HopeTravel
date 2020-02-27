export default {
    namespaced: true,
    state: {
        token: '',
        countryCode: {}
    },
    actions: {},
    mutations: {
        saveCountryCode(state, data) {
            state.countryCode = data;
        }
    }
}