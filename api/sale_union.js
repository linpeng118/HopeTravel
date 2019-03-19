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
