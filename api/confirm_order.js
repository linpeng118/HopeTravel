import axios from '@/plugins/axios/axios'

export const countprice = (data) => {
  return axios.post(`/api/product/${data.product_id}/budget?time=`+new Date().getTime(), {
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
export const addorder = (data,referrerId) => {
  // return axios.post(`/api/order`, data)
  return axios({
    method: 'post',
    url: `/api/order`,
    data,
    headers: {
      'Referrer-Id': referrerId,
      'Channel':'m'
    }
  })
}

