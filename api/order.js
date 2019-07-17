import axios from '@/plugins/axios/axios'

// 获取订单列表
export const getOrderList = (status) => {
  return axios.get(`/api/orders?type=tour&status=${status}`)
}

export const orderdetails = (id) => {
  return axios.get(`/api/order/${id}`)
}

// 手机号查询订单
export const getOrderByPhone = (data) => {
  return axios.get(`/api/order/query_by_phone`, {
    params: {
      code: data.code,
      phone: data.phone,
    }
  })
}
