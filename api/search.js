import axios from '@/plugins/axios/axios'

export const getDestination = () => {
  return axios.get('/api/destination')
}
