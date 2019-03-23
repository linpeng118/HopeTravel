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
  return axios({
    method: 'post',
    url: '/union/agent/register',
    data: {
      account: data.phone,
      code: data.code
    },
    headers: {
      'Referrer-Id': data.referrerId
    }
  })
}

// 图片请求二维码
export const getCode = (url) => {
  return axios.get(`/union/agent/qrcode?text=${url}`)
}

// 图片转化为base64
export const getBase64 = (url) => {
  return axios.get(`/union/agent/encodeFile?url=${url}`)
}

// agent/joinStatus
export const joinStatus = () => {
  return axios.get('/union/agent/joinStatus')
}

// 直接获取用户信息
export const getProfile = (id) => {
  return axios.get(`/union/agent/profile?id=${id}`)
}

//产品列表
export const getProductList = (data) => {
  return axios.get('/api/products', {
    params: {
      page: data.page || null,
      page_size: data.page_size || 9,
      order_by:data.orderBy || null,
      order: data.order || null
    }
  })
}

// 分享数据 agent/shareReport?test_id=1
export const getShareReport = () => {
  return axios.get(`/union/agent/shareReport?test_id=1`)
}
// 分享数据 agent/friendReport?test_id=100
export const getFriendReport = () => {
  return axios.get(`/union/agent/friendReport?test_id=100`)
}
