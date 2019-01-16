import axios from '@/plugins/axios/axios'

export const custom = (data) => {
  return axios.post('/paly/custom', {
    addr: data.addr,
    mobile: data.mobile,
    wx: data.wx,
  })
}
