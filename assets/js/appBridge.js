import {
  get as _get
} from 'lodash'
import {
  randomString
} from './utils'

/**
 * 测试接口是否存在,业务不需要根据此判断接口存在，只需要对jumpToVerify等暴露接口判空
 * @param {string} funcName 机型相关的api接口名
 * @param {boolean} isAndroid 是否是安卓机型
 * @return {boolean}
 */
export function testApi(funcName, isAndroid) {
  return !!_get(window, isAndroid ? `android.${funcName}` : `webkit.messageHandlers.${funcName}.postMessage`)
}

/**
 * 调用native接口
 * @param {string} funcName 机型相关的api接口名
 * @param {boolean} isAndroid 是否是安卓机型
 * @param {...*} args 传给api接口的参数列表
 */
function callApp(funcName, isAndroid, ...args) {
  console.log(`call ${isAndroid ? 'Android' : 'iOS'} api: ${funcName} args: ${args}`)
  // iOS接口必须有且仅有一个参数，否则会调用失败。如果业务没传就随便传一个参数进去
  if (!args.length && !isAndroid) {
    args = ['ignore']
  }
  if (args.length > 1 && !isAndroid) {
    console.error('only accept one parameter for ios api')
  }
  try {
    // 这里不能使用提前获取好的函数对象，也不是bind的问题
    if (isAndroid) {
      window.android[funcName](...args)
    } else {
      // iOS只能传入一个参数，多的必须装到数组里
      window.webkit.messageHandlers[funcName].postMessage(args[0])
    }
  } catch (e) {
    console.error(e)
  }
}

/* ======================= 定义调用客户端的api ======================= */

/**
 * 异步获取本地用户登录态
 * @return {Promise|null}
 */
// export const getSessionKey = (() => {
//   if (deviceType.android && testApi('getSessionKey', true)) {
//     return () => {
//       return new Promise(resolve => {
//         const funcName = `__API__${randomString(6)}`
//         window[funcName] = resolve
//         callApp('getSessionKey', true, funcName)
//       })
//     }
//   }
//   if (deviceType.ios && testApi('JSMessage_ClickAndPassSessionKey', false)) {
//     return () => {
//       return new Promise(resolve => {
//         const oldFunc = window.getSessionKey
//         window.getSessionKey = sessionKey => {
//           window.getSessionKey = oldFunc
//           resolve(sessionKey)
//         }
//         callApp('JSMessage_ClickAndPassSessionKey', false)
//       })
//     }
//   }
//   return null
// })()

/**
 * 跳转到商品列表页面
 * @param {Object} deviceType 机型 {ios: true/false}
 * @param {string} name 用户姓名，ios需要这个参数，显示在页面标题上
 */
export const jumpProductListView = (deviceType, data) => {
  if (deviceType.android && testApi('jumpProductListView', true)) {
    return (data) => callApp('jumpProductListView', true, data)
  }
  if (deviceType.ios && testApi('jumpProductListView', false)) {
    return (data) => callApp('jumpProductListView', false, data)
  }
  return null
}

/**
 *  隐藏顶部导航栏
 */
export const hideNavigationBar = (deviceType) => {
  console.log('安卓：', deviceType.android, '  ios', deviceType.ios)
  console.log(deviceType.android && testApi('hideNavigationBar', true))
  console.log(deviceType.ios && testApi('hideNavigationBar', true))
  if (deviceType.android && testApi('hideNavigationBar', true)) {
    return () => callApp('hideNavigationBar', true, false)
  }
  if (deviceType.ios && testApi('hideNavigationBar', false)) {
    return () => callApp('hideNavigationBar', false)
  }
  return null
}
/**
 *  显示顶部导航栏
 */
export const showNavigationBar = (deviceType) => {
  if (deviceType.android && testApi('showNavigationBar', true)) {
    return () => callApp('showNavigationBar', true, true)
  }
  if (deviceType.ios && testApi('showNavigationBar', false)) {
    return () => callApp('showNavigationBar', false)
  }
  return null
}

export default {
  // 以下接口需传参调用
  jumpProductListView,
  // 以下接口无需参数
  hideNavigationBar,
  showNavigationBar,
}
