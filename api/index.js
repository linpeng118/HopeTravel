import axios from '@/plugins/axios/axios'

// 获取国家手机区号
export const getCountryTelcodes = () => {
  return axios.get('/api/country/telcodes')
}

