import axios from '@/plugins/axios/axios'

// 邀请好友优惠券列表
export const inviteCoupons = () => {
  return axios.get('/api/activity/invite/coupons')
}

//
export const inviteHistory = (id) => {
  return axios.get(`/api/activity/invite/${id}/histories`)
}
