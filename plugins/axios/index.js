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
  redirect
}) {
  // 设置基础配置
  // $axios.defaults.timeout = 10000
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
      let currency = getCookieByKey('currency') || 'CNY'; // 货币类型获取
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
    console.log('Making response to ssr ' + res)
  })

  // 错误回调
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    errorHandle(code, error);
  })
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
      // 403 token过期
      // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录');
      // localStorage.removeItem('token');
      // store.commit('loginSuccess', null);
      // setTimeout(() => {
      //   toLogin();
      // }, 1000);
      break;
      // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      tip(`错误码：${status}，${other}`);
  }
}

/**
 * 提示函数
 * 禁止点击蒙层、显示三秒后关闭
 */
const tip = msg => {
  Notify({
    message: msg,
    duration: 3000,
  });
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  this.$router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}
