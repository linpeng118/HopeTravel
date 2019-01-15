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

export {
  getBrowserVersion,
  randomString,
  getUrlParam,
  validDomain,
  isMobile,
  isEmail
}
