import axios from '@/plugins/axios/axios'
export const getdateTrip = (ajax,id) => {
  return ajax.get(`/api/tour/v1/product/${id}/calendar`)

}
