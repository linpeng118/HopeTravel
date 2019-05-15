import axios from '@/plugins/axios/axios'

// 邀请好友优惠券列表
export const inviteCoupons = () => {
  return axios.get('/api/activity/invite/coupons')
}

//邀请好友接受操作历史记录
export const inviteHistory = (data) => {
  return axios.get(`/api/activity/invite/${data.id}/histories`,{
    params: {
      page: data.page || 1
    }
  })
}

// 接受好友邀请的优惠券 /activity/invite/活动ID/receive/external
export const acceptExternal = (data) => {
  return axios.post(`/api/activity/invite/${data.activity}/receive/external`, {
    phone: data.phone,
    customer_id: data.customer,
    rule_id: data.rule
  })
}

// 根据ID获取活动 activity/活动ID
