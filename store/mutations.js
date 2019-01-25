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
  }
}
