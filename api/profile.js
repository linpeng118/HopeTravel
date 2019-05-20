//存储个人信息接口   个人中心使用
import axios from '@/plugins/axios/axios'

// 获取个人信息
export const getProfile = (data) => {
  return axios.get(`/api/profile`)
}
// 获取订单
export const getOrderInfo = (status) => {
  return axios.get(`/htwPay/api/v1/user/order?type=tour&status=${status}`)
}

/**
 * 获取产品可用优惠卷
 * @param {Object} data
 */
export const couponList = (data) => {
  return axios.get(`/api/product/${data.product_id}/coupons?type=summary`)
}
/**
 * 展开产品可用优惠卷
 * @param {Object} data
 */
export const couponDetail = (data) => {
  return axios.get(`/api/product/${data.product_id}/coupons?type=detail`)
}

/**
 * 领取产品优惠卷
 * @param {Object} data
 */
export const getcouponobj = (data) => {
  return axios.post(`/api/product/${data.product_id}/receive/${data.id}`, {
    position: 'detail'
  }
)}


// 获取米粒信息
export const getPoints = (data) => {
  return axios.get(`/api/points`,{
    params: data
  })
}

// 修改个人信息
export const modifyProfile = (data) => {
  return axios({
    url: '/api/profile',
    method:'put',
    data
  })
}

// 我的收藏
export const getFavorites = (data) => {
  return axios.get(`/api/favorites`,{
    params: data
  })
}

// 意见反馈
export const submitContent = (content) => {
  return axios.post(`/api/feedback`,{
    data: {
      content
    }
  })
}

