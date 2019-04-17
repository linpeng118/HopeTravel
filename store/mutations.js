import {
  setCookieByKey
}
from '@/assets/js/utils'

export default {
  setCloseDown(state, data) {
    state.closeDown = data
  },
  setToken(state, data) {
    state.token = data
    setCookieByKey('token', state.token)
  },
  setCurrency(state, data) {
    state.currency = data
    setCookieByKey('currency', state.currency)
  },
  updateToken(state, token) {
    state.token = token
  },
  // 显示/隐藏弹窗
  toggleDialog(state, data) {
    state.isShowDlg = data
  },
  // 设置显示的弹窗类型
  setDlgType(state, data) {
    state.dlgType = data
  },
  // 保存产品详情
  saveReservePro(state, data) {
    state.reservePro = data
  }
}
