import axios from '@/plugins/axios/axios'

export const custom = (data) => {
  return axios.post('/api/custom', {
    destination: data.destination,
    phone: data.phone,
    code:data.code,
    wechat: data.wechat,
    scene: 'validate'
  })
}
export const getcustom = (id) => {
  return axios.get('/api/config/custom?custom_id='+id)
}
export const getcitylist = () => {
  return axios.get('/api/config/custom?custom_id='+0)
}
export const gettop = () => {
  return axios.get('/api/config/custom?top=true')
}
