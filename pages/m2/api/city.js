import http from '../../../plugins/axios/index'

export function getCityList() {
  return http({
    method: 'get',
    url: '/api/localPlay/city'
  })
}

export function getCityInfo(tour_city_id) {
  return http({
    method: 'get',
    url: `/api/localPlay/city/${tour_city_id}`
  })
}

