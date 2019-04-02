//优惠卷   个人中心使用
import axios from '@/plugins/axios/axios'
/**
 * 获取我的优惠卷
 * @param {Object} data
 */
export const getcouponList = (type) => {
  return axios.get(`/api/user/coupons?type=${type}`)
}

