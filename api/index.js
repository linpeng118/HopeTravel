import axios from '@/plugins/axios/axios'

// 获取国家手机区号
export const getCountryTelcodes = () => {
  return axios.get('/api/country/telcodes')
}

// 获取语言类型
export const getLanguage = () => {
  return axios.get('/api/language')
}
