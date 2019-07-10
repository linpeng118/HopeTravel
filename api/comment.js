import axios from '@/plugins/axios/axios'

/**
 * 获取评分以及评论分类条数
 * @param product_id
 */
export const getRateAndCounts = (id) => {
    return axios.get(`/api/product/${id}/comment`)
}

/**
 * 获取评论列表
 * @param id,params
 */
export const getCommentList = (id, params) => {
    return axios.get(`/api/comment/product/${id}`, {
        params,
    })
}

/**
 * 评论点赞
 * @param id
 */
export const conmmentPraise = (id) => {
    return axios.put(`/api/comment/${id}/praise`)
}

/**
 * 获取评论模板信息
 * @param template
 */
export const getTemplate = (template) => {
    return axios.get(`/api/template/${template}`)
}

/**
 * 获取评论模板信息
 * @param form
 */
export const publishComment = (form) => {
    return axios.post(`/api/comment`, form)
}
