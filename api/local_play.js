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
