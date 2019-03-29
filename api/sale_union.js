import axios from '@/plugins/axios/axios'

// 获取手机验证码
export const getSmsCode = (data) => {
  return axios.post('/api/oauth/sms/send', {
    phone: data.phone,
    scene: 'validate'
  })
}

// 登录
export const login = (data) => {
  return axios.post('/api/agent/join', {
    account: data.phone,
    code: data.code
  })
}

// 邀请注册
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/api/agent/register',
    data: {
      account: data.phone,
      code: data.code
    },
    headers: {
      'Referrer-Id': data.referrerId,
      'Channel':'m'
    }
  })
}

// 图片请求二维码
export const getCode = (url) => {
  return axios.get(`/api/agent/qrcode?text=${url}`)
}

// 图片转化为base64
export const getBase64 = (url) => {
  return axios.get(`/api/agent/encodeFile?url=${url}`)
}

// agent/joinStatus
export const joinStatus = () => {
  return axios.get('/api/agent/joinStatus')
}

// 直接获取用户信息
export const getProfile = (id) => {
  return axios.get(`/api/agent/profile?id=${id}`)
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
  return axios.get(`/api/agent/shareReport`)
}
// 分享数据 agent/friendReport?test_id=100
export const getFriendReport = () => {
  return axios.get(`/api/agent/friendReport`)
}
// 收益 incomeReport?test_id=100
export const getIncomeReport = (typeId) => {
  let url = typeId ? `/api/agent/incomeReport?sale_type=${typeId}`: '/union/agent/incomeReport'
  return axios.get(url)
}

// 收益汇总表 summaryReport?test_id=100
export const getSummaryReport = () => {
  return axios.get(`/api/agent/summaryReport`)
}

// news agent/newIncome?test_id=1000
export const getNewIncome = () => {
  return axios.get(`/api/agent/newIncome`)
}

// news agent/newIncome?test_id=1000
export const getViewStat = (data) => {
  return axios.post(`/api/agent/viewStat`,data)
}
