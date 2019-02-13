import axios from '@/plugins/axios/axios'

export const getcontants = () => {
  return axios.get(`/api/contacts`)
}
export const getcontant = (id) => {
  return axios.get(`/api/contact/${id}`)
}
export const delcontanct = (id) => {
  return axios.delete(`/api/contact`,{params: {
      contact_id:id
    }})
}
export const getquhao = () => {
  return axios.get(`/api/country/telcodes`)
}
export const addcontanct = (data) => {
  return axios.post(`/api/contact`,
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
    }
    )
}
export const setcontanct = (data,id) => {
  return axios.put(`/api/contact/${id}`,
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

