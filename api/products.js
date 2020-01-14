import axios from '@/plugins/axios/axios'

/**
 * 获取产品列表
 * @param {Object} data
 */
export const getProductList = (data) => {
  return axios.get('/api/products', {
    params: data
  })
}

export const getFilterstotal = (data) => {
  return axios.get('/api/filterstotal', {
    params: data
  })
}

//优惠券可使用的产品列表
export const getProductCoup = (data) => {
    return axios.get('/api/coupon/products', {
        params: {
            page: data.page || null,
            page_size: data.page_size || 10,
            coupon_id: data.coupon_id || null,
        }
    })
}

//获取攻略列表
export const getattack = (data) => {
    return axios.get('/api/article/list', {
        params: {
            page: data.page || null,
            page_size: data.page_size || 10,
            keyword: data.keyword || null,
        }
    })
}


//获取攻略详情
export const getattackobj = (id) => {
    return axios.get('/api/article/base', {
        params: {
            article_id: id
        }
    })
}
export const getattackobj2 = (id) => {
        return axios.get('/api/article/content', {
            params: {
                article_id: id,
                is_read: 1,
                is_app: 0
            }
        })
    }
    //获取攻略评论
export const getattaccomm = (data) => {
        return axios.get('/api/comment/product/' + data.id, {
            params: {
                page_size: data.page_size || 10,
                page: data.page,
                product_type: 1
            }
        })
    }
    //提交攻略评论
export const upcomm = (data) => {
        return axios.post('/api/comment', {
            comment: {
                template_id: 3,
                product_id: data.id,
                product_type: 1,
                parent_id: 0,
                content: data.comment
            },
            image: [],
            score: [{
                "dimension_id": 6,
                "score": 2
            }, ]

        })
    }
    //攻略是否收藏
export const getisfa = (id) => {
        return axios.get('/api/isfavorite', {
            params: {
                product_type: 'article',
                product_id: id

            }

        })
    }
    //产品是否收藏
export const getisproduct = (id) => {
        return axios.get('/api/isfavorite', {
            params: {
                product_type: 'product',
                product_id: id

            }

        })
    }
    // 产品筛选条件
export const getFilterList = (data) => {
    return axios.get('/api/filter', {
        params: data
    })
}

// 产品筛选条件
export const getNewFilterList = (data) => {
  return axios.get('/api/newfilters', {
    params: data
  })
}


/**
 * 获取产品详情
 * @param {Object} data
 */
export const getProductDetail = (data) => {
    return axios.get(`/api/product/${data.product_id}`
        /* , {
                headers: {
                    'Authorization': data.token
                }
            } */
    )
}


/**
 * 获取景点详情
 * @param {Object} data
 */
export const getTourDetail = (data) => {
    return axios.get(`/tour/detail`, {
        params: {
            tour_city_id: data.id,
            sub_tour: 0
        }
    })
}


/**
 * 添加收藏
 * @param {Object} data {product_id}
 */
export const addFavorite = (data) => {
    return axios.post(`/api/favorite`, {
        product_id: data.product_id
    })
}



/**
 * 添加收藏
 * @param {Object} data {product_id}
 */
export const addFavorite2 = (data) => {
    return axios.post(`/api/favorite`, {
        product_id: data,
        type: 'article'
    })
}

/**
 * 取消收藏
 * @param {Object} data {product_id}
 */
export const delFavorite = (data) => {
    return axios.delete(`/api/favorite`, {
        params: {
            product_id: data.product_id,
        }
    })
}
export const delFavorite2 = (data) => {
    return axios.delete(`/api/favorite`, {
        params: {
            product_id: data.product_id,
            type: 'article'
        }
    })
}
// 删除或者添加收藏
export const addOrDelFavorite = (data) => {
    if(data.favorite) {
        return axios.delete(`/api/favorite`, {
            params: {
                product_id: data.product_id,
            }
        })
    } else {
        return axios.post(`/api/favorite`, {
            product_id: data.product_id
        })
    }
    
}

/**
 * 获取收藏列表
 * @param {Object} data {page_size}
 */
export const getFavoriteList = (data) => {
    return axios.get(`/api/favorite`, {
        params: {
            page_size: data.page_size
        }
    })
}

/**
 * 获取收藏列表
 * @param {Object} data {page_size}
 */
export const getFavoriteList2 = (data) => {
    return axios.get(`/api/article/favorites`, {
        params: {
            page_size: 100,
            page: data.page
        }
    })
}

/**
 * 恢复预订通知（ 邮箱/手机号）
 * @param {Object} data {product_id}
 */
export const schedule = (data) => {
    return axios.post(`/api/product/${data.productId}/schedule`, {
        account: data.account
    })
}