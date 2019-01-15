import axios from 'axios'
import {
  TOKEN_KEY
} from '@/assets/js/config'
import store from '../../store'
// 使用UI库的弹窗
import {
  Toast
} from 'vant';

// 创建axios实例
let httprequest = axios.create({
  timeout: 1000 * 10, // 超时时间设为10s
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8', // json格式通信
    'platform': 'APP',
  }
})

// 修改默认配置-post请求头的设置
httprequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';


// 请求拦截器（有些请求需要登录态才能访问）
httprequest.interceptors.request.use(
  config => {
    // 可以设置请求头参数
    let token = store().getters.token;
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
httprequest.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200 && res.data.code === 0) {
      Promise.resolve(res.data)
    } else {
      Promise.reject(res.data)
    }
  },
  // 请求失败
  error => {
    const {
      response
    } = error;
    ('err response', response)
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
  }
)

export default httprequest

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      // toLogin();
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
      console.log(other);
  }
}

/** 
 * 提示函数 
 * 禁止点击蒙层、显示三秒后关闭
 */
const tip = msg => {
  Toast({
    type: 'fail',
    message: msg,
    duration: 3000,
    forbidClick: true
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
