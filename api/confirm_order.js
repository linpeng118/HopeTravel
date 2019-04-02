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
      coupon_cus_id:data.coupon_cus_id||'',
    }
  })
}
export const addorder = (data) => {
  return axios.post(`/api/order`, data)
}
//获取我的可用优惠卷
export const orderCouponList = (data) => {
  return axios.get(`/api/product/${data.product_id}/usablecoupon`,{
    params: {
      departure: data.departure,
      price:data.price,
    }
  })
}
