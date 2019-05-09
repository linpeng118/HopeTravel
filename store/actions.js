import {getLanguage} from '@/api/index'
export default {
  async nuxtServerInit({commit}, {req,$axios}) {
    let {code, data} = await $axios.$get('/api/language')
    await commit('setLanguage', data&&data.language || 'zh-CN')
  },
}
