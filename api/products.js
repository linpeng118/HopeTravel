import axios from '@/plugins/axios/axios'

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
    }
  })
}
// 产品列表搜素
export const getProductLists = (data) => {
  return axios.get('/api/products', {
    params: data
  })
}
// 产品筛选条件
export const getFilterList = (data) => {
  return axios.get('/api/filter', {
    params: data
  })
}
