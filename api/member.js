import axios from '@/plugins/axios/axios'

// 注册
export const register = (data) => {
  return axios.post('/api/register', {
    type: data.type,
    account: data.account,
    password: data.password,
    password_confirm: data.password_confirm,
    code: data.code,
    trace_code: data.traceCode
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

// 修改密码（用户中心里修改密码使用）
export const changePwd = (data) => {
  return axios.put('/api/user/password/change', {
    old_password: data.oldPsw,
    password: data.password,
    password_confirm: data.checkPsw
  })
}

// 获取手机验证码
export const getSmsCode = (data) => {
  return axios.post('/api/sms/send', {
    phone: data.phone,
    scene: data.scene
  })
}


// 获取手机验证码
export const getCusCode = (data) => {
  return axios.post('/api/sms/send', {
    phone: data.phone,
    scene: 'validate'
  })
}



// 验证手机号码
export const validatePhone = (data) => {
  return axios.post('/api/phone/validate', {
    phone: data.phone,
    code: data.code
  })
}

// 上传头像
export const saveProfile = (data) => {
  return axios({
    url: 'http://www.htw.tourscool.net/upload.php',
    method: 'post',
    data: data
  })
}

// 个人中心验证邮箱
export const captchaEmail = (email) => {
  return axios.get(`/api/email/captcha?email=${email}`)
}



// 获取邮箱验证码
export const getEmailCode = (data) => {
  return axios.post('/api/oauth/email/send', {
    email: data.email,
    scene: data.scene
  })
}

// 验证邮箱地址
export const validateEmail = (data) => {
  return axios.post('/api/oauth/verifyCode', {
    scene: data.scene,
    account: data.account,
    code: data.code
  })
}

// 邮箱注册
export const Emailregister = (data) => {
  return axios.post('/api/oauth/register', {
    code: data.code,
    account: data.account,
    password: data.password,
    scene: data.scene
  })
}
