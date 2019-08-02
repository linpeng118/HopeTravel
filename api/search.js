import axios from '@/plugins/axios/axios'

export const getDestination = () => {
  return axios.get('/api/destination')
}
export const getAssociateSearch = (keyword) => {
  return axios.get('/api/associate', {
    params: {
      keyword
    }
  })
}
// 搜索列表下的数据
export const getmenuSearch = (keyword) => {
  let keywordx=(keyword!=null)?keyword:''
  return axios.get('/api/categoryCount?keyword='+(keywordx))
}

// 热门关键字数据

export const getHotSearchList = () => {
  return axios.get('/api/search')
}
