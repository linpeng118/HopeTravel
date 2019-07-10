import axios from '@/plugins/axios/axios'

// 获取订单列表
export const getOrderList = (status) => {
    return axios.get(`/api/orders?type=tour&status=${status}`)
}

export const orderdetails = (id) => {
    return axios.get(`/api/order/${id}`)
}
