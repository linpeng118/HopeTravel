import axios from '@/plugins/axios/axios'

export const getLocalgroup = () => {
  return axios.get(`/api/localgroup?t=${new Date().getTime()}`)
}
