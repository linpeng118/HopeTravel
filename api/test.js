import http from '../../../plugins/axios/index'

export function getData(params) {
  return http({
    method: 'get',
    url: '/api/tour/v1/products',
    params
  })
}

export function getData2(data) {
  return http({
    method: 'post',
    url: '/api/tour/v1/products',
    data
  })
}
