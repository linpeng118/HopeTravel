import {
  PAGE_TYPE
} from '@/assets/js/consts/login'

export default {
  namespaced: true,
  state: {
    page: PAGE_TYPE.LOGIN,
    forgetForm: {}
  },
  actions: {
  },
  mutations: {
    changePage(state, data) {
      state.page = data
    },
    setForgetForm(state, data) {
      state.forgetForm = data
    }
  }
}
