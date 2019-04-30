import axios from '@/plugins/axios/axios'
export const getHomeData = () => {
  return axios.get('/api/index/mobile')
}

export const getHomeHotList = (data) => {
  console.log(9999999)
  return axios.get('/api/index/topsales',{
    params: data
  })
}
