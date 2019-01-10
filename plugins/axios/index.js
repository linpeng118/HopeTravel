import axios from 'axios'
import {
  TOKEN_KEY
} from '../../pages/m2/assets/js/common/config'
import store from '../../store'
// 使用UI库的弹窗
import {
  Toast
} from 'vant';

axios.create({
  timeout: 1000 * 10, // 超时时间设为10s
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8', // json格式通信
  }
})

// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器（有些请求需要登录态才能访问）
axios.interceptors.request.use(
  config => {
    // 可以设置请求头参数
    console.log(1, store)
    const token = store().getters.token;
    if (token) {
      config.headers[TOKEN_KEY] = token // 请求头带上token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 相应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    return Promise.resolve(error.response)
  }
)

const httpServer = (param) => {
  console.log(11, param)
  var defaults = {
    't': new Date().getTime()
  }
  let httpDefaultOpts = {
    method: param.method,
    url: param.url
  }
  if (param.method === 'get') {
    const params = param.time ? Object.assign(defaults, param.params) : param.params
    httpDefaultOpts.params = params
  } else if (param.method === 'post') {
    const data = param.time ? Object.assign(defaults, param.data) : param.data
    httpDefaultOpts.data = data
  }
  return new Promise((resolve, reject) => {
    axios(httpDefaultOpts).then(response => {
      const res = response.data
      if (res && res.code === 401) {
        // window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
      }
      resolve(res)
    }).catch(error => {
      console.log(error)
      // 统一错误处理 后续补充
      reject(error)
    })
  })
}
export default httpServer

/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Toast({
    message: msg,
    duration: 1000,
    forbidClick: true
  });
}

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });
}
