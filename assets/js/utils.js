/*
 * 设备检测
 * @return {{isIos:Function, isAndroid:Function}}
 */
export function getBrowserVersion() {
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
export function randomString(len = 32) {
  const chars = 'GQM5s7KdZhr8zFV3X4CHfU6kIq2cgTBDnoJamSyNOeYW9Rt01pLblvwiuPExjA'
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

// 获取url中参数
export function getUrlParam(name) {
  let queryString = window.location.search.substr(1) || ''
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let resulut = queryString.match(reg)
  return resulut ? decodeURIComponent(resulut[2]) : null
}
