import {
  TOKEN,
  CURRENCY,
  PLATFORM,
  PHONE_TYPE,
  APP_VERSION
} from '@/assets/js/config'
import {
  setCookieByKey
}
from '@/assets/js/utils'

export default {
  setCloseDown(state, data) {
    state.closeDown = data
  },
  // 设置token
  setToken(state, data) {
    state.token = data
    setCookieByKey(TOKEN, state.token)
  },
  // 设置货币类型
  setCurrency(state, data) {
    state.currency = data
    setCookieByKey(CURRENCY, state.currency)
  },
  // 机型
  setPhoneType(state, data) {
    state.phoneType = data
    setCookieByKey(PHONE_TYPE, state.phoneType)
  },
  // 设置平台
  setPlatform(state, data) {
    state.platform = data
    setCookieByKey(PLATFORM, state.platform)
  },
  // 设置app版本
  setAppVersion(state, data) {
    state.appVersion = data
    setCookieByKey(APP_VERSION, state.appVersion)
  },
  // 设置语言
  setLanguage(state, data) {
    state.language = data
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
