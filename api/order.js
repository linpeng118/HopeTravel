import axios from '@/plugins/axios/axios'

export const getorderlist = (status) => {
  return axios.get(`/order/user/order?type=tour&status=${status}`)
}

export const orderdetails = (id) => {
  return axios.get(`/order/order/${id}/tour`)
}
