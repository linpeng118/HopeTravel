import axios from '@/plugins/axios/axios'

// 获取手机验证码
export const getSmsCode = (data) => {
  return axios.post('/union/oauth/sms/send', {
    phone: data.phone,
    scene: 'validate'
  })
}

// 登录
export const login = (data) => {
  return axios.post('/union/agent/join', {
    account: data.phone,
    code: data.code
  })
}

// 邀请注册
export const register = (data) => {
  return axios.post('/union/agent/register', {
    account: data.phone,
    code: data.code
  })
}

// 图片请求二维码
export const getCode = (id) => {
  return axios.get(`/union/agent/qrcode?text=https://m.tourscool.com/product/detail?productId=${id}`)
}

// 图片转化为base64
export const getBase64 = (url) => {
  return axios.get(`/union/agent/encodeFile?url=${url}`)
}
