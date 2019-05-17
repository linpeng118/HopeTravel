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
  setPhoneType(state, data) {
    state.phoneType = data
    setCookieByKey('phoneType', state.phoneType)
  },
  setPlatform(state, data) {
    state.platform = data
    setCookieByKey('platform', state.platform)
  },
  setAppVersion(state, data) {
    state.appVersion = data
    setCookieByKey('appVersion', state.appVersion)
  },
  // 设置语言
  setLanguage(state, data) {
    state.language = data
    // setCookieByKey('language', state.language)
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
