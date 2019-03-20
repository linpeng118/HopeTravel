import axios from '@/plugins/axios/axios'

export const getorderlist = (status) => {
  return axios.get(`/htwPay/api/v1/user/order?type=tour&status=${status}`)
}

export const orderdetails = (id) => {
  return axios.get(`/htwPay/api/v1/order/${id}/tour`)
}
