import axios from '@/plugins/axios/axios'

/**
 * 获取产品列表
 * @param {Object} data
 */
export const getProductList = (data) => {
  return axios.get('/api/products', {
    params: {
      type: data.type,
      keyword: data.keyword || '',
      page: data.page || null,
      page_size: data.page_size || 9,
      start_city: data.start_city || null,
      stop_city: data.stop_city || null,
      span_city: data.span_city || null,
      tag: data.tag || null,
      duration: data.duration || null,
      price: data.price || null,
      product_type: data.product_type || null,
      category: data.category || '',
      order_by: data.order_by || '',
      order: data.order || '',
      cruise_id: data.lines || null,
      cruise_brand_id: data.brand || null,
    },headers: {
      'platform': 'mobile ',
      'site' : 'mobile'
    }
  })
}

// 产品筛选条件
export const getFilterList = (data) => {
  return axios.get('/api/filter', {
    params: data
  })
}

/**
 * 获取产品详情
 * @param {Object} data
 */
export const getProductDetail = (data) => {
  return axios.get(`/api/product/${data.product_id}`)
}

/**
 * 添加收藏
 * @param {Object} data {product_id}
 */
export const addFavorite = (data) => {
  return axios.post(`/api/favorite`, {
    product_id: data.product_id
  })
}

/**
 * 取消收藏
 * @param {Object} data {product_id}
 */
export const delFavorite = (data) => {
  return axios.delete(`/api/favorite`, {
    params: {
      product_id: data.product_id
    }
  })
}

/**
 * 获取收藏列表
 * @param {Object} data {page_size}
 */
export const getFavoriteList = (data) => {
  return axios.get(`/api/favorite`, {
    params: {
      page_size: data.page_size
    }
  })
}

/**
 * 恢复预订通知（ 邮箱/手机号）
 * @param {Object} data {product_id}
 */
export const schedule = (data) => {
  return axios.post(`/api/product/${data.productId}/schedule`, {
    account: data.account
  })
}
