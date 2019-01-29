import axios from '@/plugins/axios/axios'

export const getorderlist = (userId,status) => {
  return axios.get(`/order/user/${userId}/order?type=tour&status=${status}`)
}

export const orderdetails = (id) => {
  return axios.get(`/order/order/${id}/tour`)
}
