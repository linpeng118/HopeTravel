import {
  setCookieByKey
}
from '@/assets/js/utils'

export default {
  // setDeviceType(state, data) {
  //   state.deviceType = data
  // },
  setToken(state, data) {
    state.token = data
    setCookieByKey('token', state.token)
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
}
