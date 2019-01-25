//存储个人信息接口   个人中心使用
import axios from '@/plugins/axios/axios'

// 获取个人信息
export const getProfile = (data) => {
  return axios.get(`/api/profile`)
}
// 获取订单
export const getOrderInfo = (userId, status) => {
  return axios.get(`/order/user/${userId}/order?type=tour&status=${status}`)
}

// 获取米粒信息
export const getPoints = (data) => {
  return axios.get(`/api/points`,{
    params: data
  })
}



