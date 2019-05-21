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
      'Channel':'mobile'
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
export const getIncomeReport = (data) => {
  // let url = typeId ? `/api/agent/incomeReport?sale_type=${data.typeId}`: '/api/agent/incomeReport'
  return axios.get('/api/agent/incomeReport', {
    params: {
      page: data.page || null,
      sale_type: data.typeId || null
    }
  })
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
  return axios.post(`/api/agent/viewStat`, data)
}

// GET http://192.168.1.190:9001/api/tour/v1/agent/payinfo/payinfo
export const getPayInfo = () => {
  return axios.get(`/api/agent/payinfo`)
}

// GET agent/payinfo/idcard
export const setPayIDCard = (data) => {
  return axios.put(`/api/agent/payinfo/idcard `, {
    name: data.userName,
    number:data.cardId,
    account: '86-' + data.phone,
    code: data.smsCode
  })
}

// PUT /agent/payinfo/alipay
export const setPayAccount = (data) => {
  let url = `/api/agent/payinfo/${data.type}`
  return axios.put(url, {
    number: data.number,
    account: '86-' + data.account || null,
    code:data.code || null
  })
}

// POST /agent/withdraw
export const startWithdraw = (data) => {
  return axios.post('/api/agent/withdraw', {
    account_type: data.type,
    account_no: data.account_no,
    amount:data.amount
  })
}

// GET http://192.168.1.190:9001/api/tour/v1/agent/withdraw?test_id=1035
export const getWithdraw = () => {
  return axios.get('/api/agent/withdraw')
}
