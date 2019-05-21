import {
  getCookieByKey,
  setCookieByKey
}
from '@/assets/js/utils'
import {
  TOKEN_KEY
} from '@/assets/js/config'
import {
  Notify
} from 'vant';

export default function ({
                           $axios,
                           redirect,
                           store
                         }) {
  // 设置基础配置
  $axios.defaults.timeout = 10000
  $axios.defaults.withCredentials = true
  $axios.defaults.headers = {
    'Content-Type': 'application/json; charset=utf-8', // json格式通信
    'Currency': store.state.currency,
    'Platform': store.state.platform,
    'Phone-Type': store.state.phoneType,
    'App-Version': store.state.appVersion,
    'Language': store.getters.language  // zh-TW=繁体；zh-CN=中文简体
  }
  // if (process.env.NODE_ENV === 'production') {
  //   $axios.defaults.baseURL = apiConfig.base
  // }
  // post请求头设置
  // $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

  // 请求回调
  $axios.onRequest(config => {
    console.log('Making request to ssr' + config.url)
    // post和get数据处理
    if (config.method == 'post') {
      config.data = {
        ...config.data
      }
    } else if (config.method == 'get') {
      config.params = {
        t: +(Date.parse(new Date()) / 1000),
        ...config.params
      }
    }
    return config
  })

  // 响应回调
  $axios.onResponse(res => {
    console.log('Making response to ssr', res)
    // if(process.client) {
    //   console.log('client')
    //   return res.data
    // }
    return res
  })

  // 错误回调
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      console.log('400')
    }
  })
}
