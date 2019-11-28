import axios from '@/plugins/axios/axios'


//获取景区列表(全部景点的列表&&从落地页跳转到指定城市的景点列表)
export const getSceincList = (data) => {
    return axios.get('/api/tour/list', {
        params: {
            city_id: data && data.city_id || null,
            keyword: data && data.keyword || null,
            page_size: data && data.page_size || null,
            page: data && data.page || null,
        }
    })
}