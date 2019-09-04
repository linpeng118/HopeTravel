import axios from '@/plugins/axios/axios'

// 获取图片列表
export const getimgs = (data) => {
  return axios.get(`/api/tour/album`,{
    params:{
      tour_city_id:data.id||'',
      type:data.type||'all',
      page:data.page||1,

    }
  })
}
