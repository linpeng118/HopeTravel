import axios from '@/plugins/axios/axios'

export const getdateTrip = (id) => {
  return axios.get(`/api/tour/v1/product/${id}/calendar`)
}
