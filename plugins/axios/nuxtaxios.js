import {
  TOKEN_KEY
} from '@/assets/js/config'
import store from '../../store'
export default function ({ $axios, redirect }) {
  $axios.defaults.timeout = 1000 * 10
  $axios.setHeader('Content-Type', 'application/json; charset=utf-8')
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8', [
    'post'
  ])
  $axios.setHeader('platform', 'APP')
  if (store().getters.token) {
    $axios.setToken(TOKEN_KEY, store().getters.token)
  }
  $axios.onResponse(res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data))

  $axios.onRequestError(error => {
    return Promise.reject(error)
  })
  $axios.onResponseError(error => {
    const {
      response
    } = error;
    console.log('err response', response)
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
    }
  })
}
