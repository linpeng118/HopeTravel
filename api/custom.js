import axios from '@/plugins/axios/axios'

export const custom = (data) => {
  return axios.post('/api/custom', {
    destination: data.destination,
    phone: data.phone,
    wechat: data.wechat,
  })
}
