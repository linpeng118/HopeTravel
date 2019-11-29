import axios from '@/plugins/axios/axios'

export const getLandingList = (data) => {
  return axios.get('/api/index/landingpage', {
    params: {
      config_id: data.configId
    }
  })
}

export const getLandingProductSale = (data) => {
  return axios.get('/api/landingproducts', {
    params: data
  })
}