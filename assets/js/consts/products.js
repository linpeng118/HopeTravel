// 列表类型，1=当地跟团，2=当地玩乐，3=HopeTravel精品，4=门票演出，5=一日游，6=接驳服务，7=邮轮
const LIST_TYPE = {
    LOCAL_GROUP: 1,
    LOCAL_PLAY: 2,
    XF_QUALITY: 3,
}

// 产品类型，0=一日游，1=多日游，2=邮轮（未使用），3=酒店（未使用），4=票务（未使用)
const ENTITY_TYPE = {
    A_DAY_TRIP: 0,
    MANY_DAY_TRIP: 1,
    CRUISE: 2,
    HOTEL: 3,
    TICKET: 4,
}

const TAB_PARAMS = {
    all: 'ya',
    local_heel: 'yg',
    local_play: 'yw',
    self_support: 'yj',
    cruise: 'yl',
    one_day: 'yr',
    ticket: 'ym',
    shuttle: 'yc',
    taste: 'yt',
    wifi: 'yf',
}

export {
    LIST_TYPE,
    ENTITY_TYPE,
    TAB_PARAMS
}