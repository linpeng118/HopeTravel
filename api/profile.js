//存储个人信息接口   个人中心使用
import axios from '@/plugins/axios/axios'

export const getProfile = (data) => {
  return axios.get(`/api/profile`)
}




