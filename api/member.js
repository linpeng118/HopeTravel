import axios from '@/plugins/axios/axios'

// 注册
export const register = (data) => {
  return axios.post('/api/register', {
    type: data.type,
    account: data.account,
    password: data.password,
    password_confirm: data.password_confirm,
    code: data.code
  })
}

// 登录
export const login = (data) => {
  return axios.post('/api/login', {
    type: data.type,
    account: data.account,
    password: data.password,
    code: data.code
  })
}

// 登出
export const layout = () => {
  return axios.post('/api/layout')
}

// 找回密码
export const findPwd = (data) => {
  return axios.put('/api/user/password', {
    account: data.account,
    password: data.password,
    code: data.code
  })
}

// 修改密码
export const changePwd = (data) => {
  return axios.put('/api/user/password/change', {
    old_password: data.old_password,
    password: data.password,
    password_confirm: data.password_confirm
  })
}

// 获取邮箱验证码
export const getEmailCode = (data) => {
  return axios.post('/api/email/send', {
    email: data.email,
    scene: data.scene
  })
}

// 获取手机验证码
export const getSmsCode = (data) => {
  return axios.post('/api/sms/send', {
    phone: data.phone,
    scene: data.scene
  })
}
