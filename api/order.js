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

// 根据订单id获取token
export const getTokenByOrderId = (data) => {
  return axios.get(`/api/token_by_order_id`, {
    params: {
      auth_code: data.auth_code,
      order_id: data.order_id,
    }
  })
}

// 游客查询订单详情
export const getTouristsOrderDetail = (data) => {
  return axios.get(`/api/order_info/query_by_phone`, {
    params: {
      auth_code: data.auth_code,
      order_id: data.order_id,
    }
  })
}
