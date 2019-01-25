import axios from '@/plugins/axios/axios'
export const getHomeData = () => {
  return axios.get('/api/index')
}

export const getHomeHotList = (data) => {
  return axios.get('/api/index/topsales',{
    params: data
  })
}
