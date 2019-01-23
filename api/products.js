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
      span_city: data.span_city || '34',
      tag: data.tag || null,
      duration: data.duration || null,
      price: data.price || null,
      product_type: data.product_type || null,
      category: data.category || '',
      order_by: data.order_by || '',
      order: data.order || '',
    }
  })
}

/**
 * 获取产品详情
 * @param {Object} data
 */
export const getProductDetail = (data) => {
  return axios.get(`/api/product/${data.product_id}`)
}
