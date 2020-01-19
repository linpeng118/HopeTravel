import {getLanguage} from '@/api/index'
import {
  getCookie
} from '@/assets/js/utils'
export default {
  async nuxtServerInit({commit}, {req,$axios}) {
    let cookie = getCookie('token', req && req.headers && req.headers.cookie)
    let {code, data} = await $axios.$get('/api/language')
    commit('setToken', cookie)
    await commit('setLanguage', data && data.language || 'zh-CN')
  },
}
