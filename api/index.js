import axios from '@/plugins/axios/axios'

// 获取国家手机区号
export const getCountryTelcodes = () => {
  return axios.get('/api/country/telcodes')
}

// 获取语言类型
export const getLanguage = () => {
  return axios.get('/api/language')
}
// 获取客服电话列表
export const getPhone = () => {
  return axios.get('/api/phones?platform=mobile')
}
