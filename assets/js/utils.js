import { LIST_PARAMS, TRUE_PARAMS, CUSTOMER_SERVICE } from './config'
import {TAB_PARAMS} from './consts/products'
/**
 * 存储localStorage
 */
function setLocalStore(name, content) {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
function getLocalStore(name) {
    if (!name) return;
    return JSON.parse(window.localStorage.getItem(name));
}

/**
 * 删除localStorage
 */
function clearLocalStore(name) {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 存储sessionStorage
 */
function setSessionStore(name, content) {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content)
}

/**
 * 获取sessionStorage
 */
function getSessionStore(name) {
    if (!name) return;
    return window.sessionStorage.getItem(name)
}

/**
 * 设置cookie
 * @param {string} key 传入的键名
 * @param {string} value 传入数据
 * @param {string} exdays 保存的天数
 */
function setCookieByKey(key, value, exdays = 365) {
    let d = new Date();
    let str = `__tourscool_`
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = `expires=${d.toUTCString()}`
    document.cookie = `${str}${key}=${value};expires=${expires};path=/`;
    // Cookies.set(key, value, { path: '/' })
    // document.cookie = `${key}=${value}`;
}

/**
 * 获取cookie
 * @param {string} key 传入的键名
 */
function getCookieByKey(key) {
    if (document.cookie.length > 0) {
        let str = '__tourscool_'
        let cStart = document.cookie.indexOf(`${str}${key}=`); // 获取字符串的起点

        if (cStart !== -1) {
            cStart = cStart + key.length + str.length + 1; // 获取值的起点
            let cEnd = document.cookie.indexOf(';', cStart); // 获取结尾处
            if (cEnd === -1) cEnd = document.cookie.length; // 如果是最后一个，结尾就是cookie字符串的结尾
            return decodeURI(document.cookie.substring(cStart, cEnd)); // 截取字符串返回
        }
    }
    return '';
    // Cookies.get('name')
}

/**
 * 清除cookie
 * @param {string} key 传入的键名
 */
function clearCookieByKey(key) {
    // Cookies.remove(key, { path: '/' })
    setCookieByKey(key, '', -1)
}

/*
 * 设备检测
 * @return {{isIos:Function, isAndroid:Function}}
 */
function getBrowserVersion() {
    const ua = navigator.userAgent || navigator.vendor || window.opera
    const uaInfo = {
        ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua),
        android: /Android/i.test(ua) || /Linux/i.test(ua)
    }
    return {
        isIos() {
            return uaInfo.ios
        },
        isAndroid() {
            return uaInfo.android
        }
    }
}
/**
 * 生成指定长度的随机字符串序列
 * @param {number?} len
 * @returns {string}
 */
function randomString(len = 32) {
    const chars = 'GQM5s7KdZhr8zFV3X4CHfU6kIq2cgTBDnoJamSyNOeYW9Rt01pLblvwiuPExjA'
    const maxPos = chars.length
    let pwd = ''
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return pwd
}

// 获取url中参数
function getUrlParam(name) {
    let queryString = window.location.search.substr(1) || ''
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let resulut = queryString.match(reg)
    return resulut ? decodeURIComponent(resulut[2]) : null
}

/**
 * 验证是域名是否合法
 * @param domain
 * @returns {boolean}
 */
function validDomain(domain) {
    return /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/i.test(domain);
}

/**
 * isMobile 是否是合法的手机号码
 * 166,198,199开头等
 */
function isMobile(mobile) {
    return /^1[3|4|5|6|7|8|9]\d{9}$/i.test(mobile);
}

function isEmail(val) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/i.test(val);
}

/**
 * @param {String} cookieName cookie名，比如：currency
 * @param {String} stringCookie 整体的cookie字符串
 */
function getCookie(cookieName, stringCookie) {
    let str = '__tourscool_'
    let cookie = new RegExp(str + cookieName + '[^;]+').exec(stringCookie)

    if (!(cookie && cookie.length)) {
        return null
    } else {
        let strCookie = cookie[0]
        return unescape(strCookie ? strCookie.toString().replace(/^[^=]+./, '') : '')
    }
}
/**
 * 验证身份证是否合法
 * @returns {boolean}
 */
function isCard(val) {
    // /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val)
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
}

/**
 * 根据导航序列化字段
 * @returns {obj}
 */
function getParams(str) {
    // tj 途径景点；cf 出发城市; js 结束城市; sj 行程天数；jg 价格预算；page 为当前的页数；zl 游轮
    // yg 当地跟团 type 1；yw 当地玩乐 type 2；yj稀饭自营 type 3 ；yl 游轮 type 7；ym 门票演出 4; yr 一日游 5
    // /21312/yg-cf29-tj143_131-js32
    let _searchArr = str.split('-')
    let res = {}
    let type = {
        ya: 'local_heel', // 重新设计导航没有稀饭推荐了，为了兼容以前链接
        yg: 'local_heel',
        yw: 'local_play',
        yj: 'self_support',
        yl: 'cruise',
        ym: 'ticket',
        yr: 'one_day',
        yc: 'shuttle',
        yt: 'taste',
        yf: 'wifi'
    }
    for (let i = 0, len = _searchArr.length; i < len; i++) {
        if (_searchArr[i].length === 2 && _searchArr[i].indexOf('y') === 0) {
            res.type = type[_searchArr[i]]
        } else {
            res[LIST_PARAMS[_searchArr[i].substring(0, 2)]] = _searchArr[i].substring(2)
        }
    }
    if (res.span_city) {
        res.span_city = res.span_city.replace(/_/g, ',')
    }
    if (res.duration) {
        res.duration = res.duration.replace(/_/g, ',')
    }
    return res
}

function changeParams(params) {
    let _arr = ['ya', 'yg', 'yw', 'yj', 'ym', 'yr', '', 'yl']
    let resArr = []
    Object.keys(params).forEach(key => {
        if (key === 'span_city' && params.span_city) {
            params.span_city = params.span_city.split(',').sort((a, b) => {
                return parseInt(a) - parseInt(b)
            }).join('_')
        }
        if (key === 'duration' && params.duration) {
            params.duration = params.duration.split(',').sort((a, b) => {
                return parseInt(a) - parseInt(b)
            }).join('_')
        }
        if (params[key]) {
            if (key !== 'category' && key !== 'type') {
                resArr.push(`${TRUE_PARAMS[key]}${params[key]}`)
            }
        }
    })
    resArr.sort()
    if (params.type) {
        resArr.unshift(`${TAB_PARAMS[params.type]}`)
    }
    params.category = params.category || 'all'
    let _url = `/${params.category}/${resArr.join('-')}`
    return _url
}

/**
 * 排除重复和添加字段处理
 * @returns str
 */
function removeOrAddStr(str, name) {
    //str = '1,2,3' name = '5'
    let reg = new RegExp('(^|,)' + name)
    if (!reg.test(str)) {
        return str + ',' + name
    } else {
        let result = str.replace(reg, '')
        return result.substring(0, 1) === ',' ? result.substring(1) : result
    }
}

/* 根据服务器时间替换53客服链接 */
function replaceServerUrl() {
    var src = "https://tb.53kf.com/code/client/10181581/2";
    var americaUtcDate = window[CUSTOMER_SERVICE];
    console.log(americaUtcDate);

    if (americaUtcDate < 1 || americaUtcDate >= 14) {
        src = "https://tb.53kf.com/code/client/3d536eec7f1463b6367bc401b498f8c67/3"
    }
    return src;
}

export {
    setLocalStore,
    getLocalStore,
    clearLocalStore,
    setCookieByKey,
    getCookieByKey,
    getCookie,
    clearCookieByKey,
    getBrowserVersion,
    randomString,
    getUrlParam,
    validDomain,
    isMobile,
    isEmail,
    isCard,
    setSessionStore,
    getSessionStore,
    getParams,
    changeParams,
    removeOrAddStr,
    replaceServerUrl,
}