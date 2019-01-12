import axios from '@/plugins/axios/axios'

// export const getHotActivities = () => {
//   return axios({
//     method: 'get',
//     url: '/api/localPlay/activity',
//   })
// }

export const getHotActivities = () => {
  return axios.get('/api/localPlay/activity')
}
// export const getCityList = () => {
//   return axios.get('/api/localPlay/city')
// }
// export const getCityInfo = (id) => {
//   return axios.get(`/api/localPlay/city/${id}`)
// }
// export const getPlay = () => {
//   return axios.get('/paly/localplay')
// }

export const getCityInfo = (ajax, id) => {
  return ajax.get(`/api/localPlay/city/${id}`)
}
export const getCityList = (ajax) => {
  return ajax.get('/api/localPlay/city')
}
export const getPlay = (ajax) => {
  return ajax.get('/paly/localplay')
}

export const getProductList = (ajax,ids) => {
  return ajax.get(`/api/product/ids?product=${ids}`)
}
