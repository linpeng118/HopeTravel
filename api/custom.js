import axios from '@/plugins/axios/axios'

export const custom = (data) => {
  return axios.post('/api/custom', {
    destination: data.destination,
    phone: data.phone,
    wechat: data.wechat,
  })
}
export const getcustom = (id) => {
  return axios.get('/api/config/custom?custom_id='+id)
}
export const getcitylist = () => {
  return axios.get('/api/config/custom?custom_id='+0)
}
