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
 * 设置cookie
 * @param {string} key 传入的键名
 * @param {string} value 传入数据
 * @param {string} exdays 保存的天数
 */
function setCookieByKey(key, value, exdays = 365) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = `expires=${d.toUTCString()}`
  document.cookie = `${key}=${value};expires=${expires}`;
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
}

/**
 * 清除cookie
 * @param {string} key 传入的键名
 */
function clearCookieByKey(key) {
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

//
function resetTime(time) {
  var timer = null;
  var t = time;
  var m = 0;
  var s = 0;
  m = Math.floor(t / 60 % 60);
  m < 10 && (m = '0' + m);
  s = Math.floor(t % 60);
  timer = setInterval(function () {
    s--;
    s < 10 && (s = '0' + s);
    if (s.length >= 3) {
      s = 59;
      m = "0" + (Number(m) - 1);
    }
    if (m.length >= 3) {
      m = '00';
      s = '00';
      clearInterval(timer);
    }
    console.log(m + "分钟" + s + "秒");
  }, 1000);
}

export {
  setLocalStore,
  getLocalStore,
  clearLocalStore,
  setCookieByKey,
  getCookieByKey,
  clearCookieByKey,
  getBrowserVersion,
  randomString,
  getUrlParam,
  validDomain,
  isMobile,
  isEmail,
  resetTime
}
