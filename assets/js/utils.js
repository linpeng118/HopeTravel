// 获取url中参数
export function getUrlParam(name) {
  let queryString = window.location.search.substr(1) || ''
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let resulut = queryString.match(reg)
  return resulut ? decodeURIComponent(resulut[2]) : null
}
