import axios from '@/plugins/axios/axios'

export const getLandingList = (data) => {
  return axios.get('/api/index/landingpage', {
    params: {
      tour_city_id: data.tourCityId
    }
  })
}

export const getLandingProductSale = (data) => {
  return axios.get('/api/landingproducts', {
    params: data
  })
}