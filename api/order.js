import axios from '@/plugins/axios/axios'

export const getorderlist = (data) => {
 var obj=(data.status=='')?{}:{status:data.status}
  return axios.get(`/api/v1/user/${data.user_id}/order?type=tour`,{
    params:obj
  })
}

export const orderdetails = (data) => {
  return axios.get(`http://www.htw.tourscool.net/api/v1/order/${data.order_id}/tour`)
}
