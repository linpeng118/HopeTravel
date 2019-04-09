import axios from '@/plugins/axios/axios'

// export const getHotActivities = ($axios) => {
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
//   return axios.get('/play/localplay')
// }

export const getCityInfo = (id) => {
  return axios.get(`/api/localPlay/city/${id}`)
}
export const getCityList = () => {
  return axios.get('/api/localPlay/city')
}
export const getPlay = () => {
  return axios.get(`/api/localplay`)
}

export const getProductList = (ids) => {
  return axios.get(`/api/product/ids?product=${ids}`,{
    headers: {
      'platform': 'mobile ',
      'site' : 'mobile'
    }
  })
}
