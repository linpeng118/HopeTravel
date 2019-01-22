import axios from '@/plugins/axios/axios'

export const getcontacts = (id) => {
  return axios.get(`/api/tour/v1/product/${id}/calendar`)
}
