import axios from '../../../plugins/axios/index'

export const getHotActivities = () => {
  return axios({
    method: 'get',
    url: '/api/localPlay/activity',
  })
}

export const getHotActivities2 = () => {
  return axios.get('localPlay/activity2')
}
