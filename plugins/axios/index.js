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
  $axios.defaults.headers = {
    'Content-Type': 'application/json; charset=utf-8', // json格式通信
    'platform': 'APP',
    'phoneType': 'iOS'
  }
  // // post请求头设置
  // $axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

  // 请求回调
  $axios.onRequest(config => {
    // console.log('Making request to ' + config.url)
    if (process.client) {
      // TODO:这里不能动态获取到store中的数据
      let token = getCookieByKey('token');
      let currency = getCookieByKey('currency') || store().state.currency; // 货币类型获取
      // console.log(token, currency)
      if (token || currency) {
        config.headers[TOKEN_KEY] = token
        config.headers.currency = currency
      }
    }
    return config
  })

  // 响应回调
  $axios.onResponse(res => {
    // console.log('Making response to ' + res.url)
  })

  // 错误回调
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // console.log('400')
    }
  })
}
