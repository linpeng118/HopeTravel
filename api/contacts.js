import axios from '@/plugins/axios/axios'
export const getcontacts = (id) => {
  return axios.get(`/api/tour/v1/product/${id}/calendar`)
}

export const addcontanct = (data) => {
  console.log('发起了一次请求')
  return axios.post(`/api/tour/v1/contact`,
    {
      "name_cn":data.name_cn||'',
      "firstname":data.firstname||'',
      "lastname":data.lastname||'',
      "phone":data.phone||'',
      "dob":data.dob||'',
      "email":data.email||'',
      "passport":data.passport||'',
      "nationality":data.nationality||'',
      "gender":data.gender||'',
      "identity":data.identity||'',
      "phone_country":data.phone_country||''
    },{
      headers: {
        'Authorization': 'token'
      }
    }
    )
}
export const setcontanct = (data,id) => {
  console.log('发起了一次请求')
  return axios.put(`/api/tour/v1/contact/${id}`,
    {
      "name_cn":data.name_cn||'',
      "firstname":data.firstname||'',
      "lastname":data.lastname||'',
      "phone":data.phone||'',
      "dob":data.dob||'',
      "email":data.email||'',
      "passport":data.passport||'',
      "nationality":data.nationality||'',
      "gender":data.gender||'',
      "identity":data.identity||'',
      "phone_country":data.phone_country||''
    },{
      headers: {
        'Authorization': 'token'
      }
    }
  )
}
