import axios from '@/plugins/axios/axios'

export const getdateTrip = (id) => {
  return axios.get(`/api/product/${id}/calendar`)
}
