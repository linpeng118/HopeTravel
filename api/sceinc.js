import axios from '@/plugins/axios/axios'


//获取景区列表
export const getSceincList = (data) => {
  return axios.get('/api/tour/list', {
    params: {
      keyword: data && data.keyword || null,
      page_size: data && data.page_size || null,
      page: data && data.page || null,
    }
  })
}
