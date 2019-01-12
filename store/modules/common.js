import {
  TOKEN_KEY
} from '@/assets/js/config'

const user = {
  state: {
    token: process.client ? process.client : ''
  },
  mutations: {
    updateToken: (state, token) => {
      state.token = token
    }
  }
}

export default user
