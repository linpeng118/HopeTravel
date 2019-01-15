import axios from '@/plugins/axios/axios'

export const getdateTrip = () => {
  return axios.get('/paly/localgroup')
}
