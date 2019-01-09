import axios from '../../../plugins/axios/index'

export const getHotActivities = () => {
  return axios({
    method: 'get',
    url: '/api/tour/v1/localPlay/activity',
  })
}

export const getHotActivities2 = () => {
  return axios.get('localPlay/activity2')
}
