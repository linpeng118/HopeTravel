import {
  PAGE_TYPE
} from '@/assets/js/consts/login'

export default {
  namespaced: true,
  state: {
    page: PAGE_TYPE.LOGIN, // 登录页面类型
    isShowDlg: false, // 是否显示登录弹窗
    forgetForm: {}, // 忘记密码参数
  },
  actions: {},
  mutations: {
    // 切换显示的页面
    changePage(state, data) {
      state.page = data
    },
    // 显示/隐藏弹窗
    toggleDialog(state, data) {
      state.isShowDlg = data
      if (!data) {
        state.page = PAGE_TYPE.LOGIN
      }
    },
    // 设置忘记密码参数
    setForgetForm(state, data) {
      state.forgetForm = data
    }
  }
}
