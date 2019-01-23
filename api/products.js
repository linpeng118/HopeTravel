import axios from '@/plugins/axios/axios'

export const getProductList = (data) => {
  return axios.get('/api/products', {
    params: {
      type: data.type,
      keyword: data.keyword || '',
      page: data.page || 0,
      page_size: data.page_size || 9,
      start_city: data.start_city || 0,
      stop_city: data.stop_city || 0,
      span_city: data.span_city || '34',
      tag: data.tag || 0,
      duration: data.duration || 0,
      price: data.price || 0,
      product_type: data.product_type || 0,
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
