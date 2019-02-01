import axios from '@/plugins/axios/axios'
export const getHomeData = () => {
  return axios.get('/api/index/mobile')
}

export const getHomeHotList = (data) => {
  return axios.get('/api/index/topsales',{
    params: data
  })
}
