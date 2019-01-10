import axios from '@/plugins/axios/axios'

export const getProductList = (data) => {
  return axios.get('/api/products', {
    params: {
      type: data.type,
      keyword: data.keyword,
      page: data.page,
      page_size: data.page_size,
      start_city: data.start_city,
      stop_city: data.stop_city,
      span_city: data.span_city,
      tag: data.tag,
      duration: data.duration,
      price: data.price,
      product_type: data.product_type,
      category: data.category,
      order_by: data.order_by,
      order: data.order,
    }
  })
}
