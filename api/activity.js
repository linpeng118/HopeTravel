import axios from '@/plugins/axios/axios'

// 获取活动规则
export const getPullNewRules = (data) => {
	return axios.get('/api/activity/rules', {
		params: {
			type: data.type
		}
	})
}

// 领取新人立减优惠券（站外）
export const getCouponsExternal = (data) => {
	return axios.post(`/api/activity/reduction/${data.id}/receive/external`, {
		phone: data.phone
	})
}

// 领取新人立减优惠券（站内）
export const getCouponsReceive = (data) => {
	return axios.post(`/api/activity/reduction/${data.id}/receive`)
}

// 领取新人立减优惠券（站内）
export const getProducts = (data) => {
	return axios.get(`/api/activity/reduction/products`, {
		params: {
			page_size: data.pageSize
		}
	})
}

// 获取新人专享优惠劵列表
export const getNewCoupon = (data) => {
  return axios.get(`/api/activity/reduction/coupons`)
}

// 获取新人专享优惠劵列表
export const getPro = (data) => {
  return axios.get(`/api/newer`)
}
