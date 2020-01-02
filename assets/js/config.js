export const CODE_OK = 0
    // 产品id列表
export const PRODUCTIDS = 'product_ids'
    // SessionStore
export const SESSIONSTORE = 'referrer_id'
    // 平台
export const PLATFORM = 'platform'
    // 语言
export const LANGUAGE = 'language'
    // 货币符号
export const CURRENCY = 'currency'
    // 登录态
export const TOKEN = 'token'
    // 机型
export const PHONE_TYPE = 'phoneType'
    // APP版本
export const APP_VERSION = 'appVersion'

// 列表页面导航链接参数
// tj 途径景点；cf 出发城市; js 结束城市; sj 行程天数；jg 价格预算；pt 产品小分类 product_type ; zl 游轮；page 为当前的页数
// cf_js_tj_sj_jg_pt
export const LIST_PARAMS = {
    cf: 'start_city',
    dc: 'departure_city',
    jg: 'price',
    js: 'stop_city',
    sj: 'duration',
    tj: 'span_city',
    tc: 'tour_city',
    pt: 'product_type',
    zl: 'brand',
    ln: 'lines'
}

export const TRUE_PARAMS = {
    'start_city': 'cf',
    'departure_city': 'dc',
    'price': 'jg',
    'stop_city': 'js',
    'duration': 'sj',
    'tour_city': 'tc',
    'span_city': 'tj',
    'product_type': 'pt',
    'brand': 'zl',
    'lines': 'ln'
}

// 
export const CUSTOMER_SERVICE = '__tourscool_customer_service_time'