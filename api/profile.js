//存储个人信息接口   个人中心使用
import axios from '@/plugins/axios/axios'

// 获取个人信息
export const getProfile = (data) => {
  return axios.get(`/api/profile`)
}
// 获取订单
export const getOrderInfo = (status) => {
  return axios.get(`/order/user/order?type=tour&status=${status}`)
}

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

// 删除收藏
export const deleteFavorites = (productIds) => {
  return axios.delete(`/api/favorites`,{
    data: {
      product_id: productIds
    }
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

