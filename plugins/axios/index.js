import axios from 'axios'
import {
  TOKEN_KEY
} from '@/assets/js/config'
import store from '../../store'
axios.create({
  timeout: 1000 * 10,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})
axios.interceptors.request.use(config => {
  // 可以设置请求头参数
  if (store().getters.token) {
    config.headers[TOKEN_KEY] = store().getters.token // 请求头带上token
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  // 对请求返回数据进行处理
  return response
}, error => {
  return Promise.resolve(error.response)
})

const httpServer = (param) => {
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
