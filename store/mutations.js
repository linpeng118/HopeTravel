export default {
  setDeviceType(state, data) {
    state.deviceType = data
    ('setDeviceType', state.deviceType)
  },
}
