import {
  TOKEN_KEY
} from '../../pages/m2/assets/js/common/config'

const user = {
  state: {
    token: process.navigator ? window.localStorage.getItem(TOKEN_KEY) : ''
  },
  mutations: {
    updateToken: (state, token) => {
      state.token = token
    }
  }
}

export default user
