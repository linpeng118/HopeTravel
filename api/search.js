import axios from '@/plugins/axios/axios'

export const getDestination = () => {
  return axios.get('/api/destination')
}
export const getAssociateSearch = (keyword) => {
  return axios.get('/api/associate', {
    params: {
      keyword
    }
  })
}
