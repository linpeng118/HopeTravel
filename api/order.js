import axios from '@/plugins/axios/axios'

export const getorderlist = (status) => {
  return axios.get(`/htwPayment/api/v1/user/order?type=tour&status=${status}`)
}

export const orderdetails = (id) => {
  return axios.get(`/htwPayment/api/v1/order/${id}/tour`)
}
