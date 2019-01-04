import http from '../plugins/axios'

export function getData() {
  return http({
    method: 'get',
    url: '/api/tour/v1/products'
  })
}
