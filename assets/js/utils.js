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
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = `expires=${d.toUTCString()}`
  document.cookie = `${key}=${value};expires=${expires};path=/`;
  // Cookies.set(key, value, { path: '/' })
  // document.cookie = `${key}=${value}`;
}

/**
 * 获取cookie
 * @param {string} key 传入的键名
 */
function getCookieByKey(key) {
  if (document.cookie.length > 0) {
    let cStart = document.cookie.indexOf(`${key}=`); // 获取字符串的起点
    if (cStart !== -1) {
      cStart = cStart + key.length + 1; // 获取值的起点
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
 * 验证身份证是否合法
 * @returns {boolean}
 */
function isCard(val) {
  // /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val)
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val);
}
  /**
 * @param {String} cookieName cookie名，比如：currency
 * @param {String} stringCookie 整体的cookie字符串
 */
function getCookie(cookieName, stringCookie) {
  let cookie = new RegExp('' + cookieName + '[^;]+').exec(stringCookie)

  if (!(cookie&&cookie.length)) {
    return null
  } else {
    let strCookie = cookie[0]
    return unescape(strCookie ? strCookie.toString().replace(/^[^=]+./, '') : '')
  }
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
  setSessionStore,
  getSessionStore,
  isCard
}
