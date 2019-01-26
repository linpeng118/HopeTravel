// 验证码状态
const VERIFY_CODE = {
  START: 0, // 开始
  GETTING: 1, // 获取ing
  AGAIN: 2, // 重新获取
}

// 注册类型/修改密码类型
const LOGIN_WAY = {
  PHONE: 'phone',
  EMAIL: 'email'
}

// 登录类型
const LOGIN_TYPE = {
  PHONE: 'phone', // 手机登录
  GENERAL: 'general' // 普通登录
}

// 短信使用场景
const SMS_SCENE = {
  RGISTER: 'register', // 注册
  LOGIN: 'login', // 登陆
  VALIDATE: 'validate', // 验证手机号码
  RSPWD: 'resetPassword', // 找回密码
}

// 邮件使用场景
const EMAIL_SCENE = {
  RGISTER: 'register', // 注册
  RSPWD: 'resetPassword', // 找回密码
}

const OPERATE_TYPE = {
  ATTR: 'attention',
  TEL: 'tel',
  ONLINE: 'online',
}

export {
  VERIFY_CODE,
  LOGIN_WAY,
  LOGIN_TYPE,
  SMS_SCENE,
  EMAIL_SCENE,
  OPERATE_TYPE
}
