import {
  getCookieByKey
}
from '@/assets/js/utils'

export default function ({
  $axios,
  redirect
}) {
  // 设置基础配置
  $axios.defaults.timeout = 10000
  $axios.defaults.withCredentials = true
  $axios.defaults.headers = {
    'Content-Type': 'application/json; charset=utf-8', // json格式通信
    'platform': 'app',
    'phoneType': 'iOS',
    'App-Version': '1.0.0'
  }
  // // post请求头设置
  // $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

  // 请求回调
  $axios.onRequest(config => {
    console.log('Making request to ssr ' + config.url)
    if (process.client) {
      // TODO:这里不能动态获取到store中的数据
      let token = getCookieByKey('token');
      let currency = getCookieByKey('currency'); // 货币类型获取
      // console.log(token, currency)
      if (token || currency) {
        config.headers[TOKEN_KEY] = token
        config.headers.currency = currency
      }
      // 请求接口添加时间戳
      if (config.method == 'post') {
        config.data = {
          ...config.data,
        }
      } else if (config.method == 'get') {
        config.params = {
          t: +(Date.parse(new Date()) / 1000),
          ...config.params
        }
      }
    }
    return config
  })

  // 响应回调
  $axios.onResponse(res => {
    // console.log('Making response to ssr ' + res)
  })

  // 错误回调
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // console.log('400')
    }
  })
}
