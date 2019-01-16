import axios from '@/plugins/axios/axios'

export const countprice = (data) => {
  console.log('发起了一次请求')
  return axios.post(`/api/tour/v1/product/${data.product_id}/budget`, {
    product: {
      product_id: data.product_id||'',
      departure_date: data.departure_date||'',
      room_total: data.room_total||0,
      room_attributes: data.room_attributes||[],
      product_departure: data.product_departure||'',
      attributes: data.attributes||[],
      is_point: data.is_point||false,
    }
  })
}
