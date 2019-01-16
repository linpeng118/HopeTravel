import {
  get as _get
} from 'lodash'
import {
  getBrowserVersion,
  randomString
} from './utils'

const browserVersion = getBrowserVersion()

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
 * @param {Object} args 传给api接口的参数对象
 */
function callApi(funcName, isAndroid, args) {;
  `call ${isAndroid ? 'Android' : 'iOS'} api: ${funcName} args: ${args}`
  // 无参iOS（iOS接口必须有且仅有一个参数，否则会调用失败, 这里随意创建一个参数)
  if (!args && !isAndroid) {
    args = {}
  }
  try {
    // 这里不能使用提前获取好的函数对象，也不是bind的问题
    if (isAndroid) {
      if (args) {
        // 有参安卓
        const strJson = JSON.stringify(args)
        window.android[funcName](strJson)
      } else {
        // 无参安卓
        window.android[funcName]()
      }
    } else {
      // iOS只能传入一个参数，多的必须装到数组里
      console.log('传递给ios数据')
      console.log(args)
      window.webkit.messageHandlers[funcName].postMessage(args)
    }
  } catch (e) {
    console.error(e)
  }
}

/**
 * 快速创建带参数接口
 * @param {string|null} androidFuncName 安卓的方法名，传null表示该平台无对应的接口
 * @param {string|null} iosFuncName ios的方法名，传null表示该平台无对应的接口
 * @return {Function|null}
 */
function createArgApi(androidFuncName, iosFuncName) {
  if (browserVersion.isAndroid() && androidFuncName && testApi(androidFuncName, true)) {
    return data => callApi(androidFuncName, true, data)
  }
  if (browserVersion.isIos() && iosFuncName && testApi(iosFuncName, false)) {
    return data => callApi(iosFuncName, false, data)
  }
  return null
}

/**
 * 快速创建无参数接口
 * @param {string|null} androidFuncName 安卓的方法名，传null表示该平台无对应的接口
 * @param {string|null} iosFuncName ios的方法名，传null表示该平台无对应的接口
 * @return {Function|null}
 */
function createNoArgApi(androidFuncName, iosFuncName) {
  if (browserVersion.isAndroid() && androidFuncName && testApi(androidFuncName, true)) {
    return () => callApi(androidFuncName, true, null)
  }
  if (browserVersion.isIos() && iosFuncName && testApi(iosFuncName, false)) {
    return () => callApi(iosFuncName, false, null)
  }
  return null
}

/**
 * 异步获取本地用户登录态
 * @return {Promise|null}
 */
// export const getSessionKey = (() => {
//   if (browserVersion.isAndroid() && testApi('getSessionKey', true)) {
//     return () => {
//       return new Promise(resolve => {
//         const funcName = `__API__${randomString(6)}`
//         window[funcName] = resolve
//         callApi('getSessionKey', true, funcName)
//       })
//     }
//   }
//   if (browserVersion.isIos() && testApi('JSMessage_ClickAndPassSessionKey', false)) {
//     return () => {
//       return new Promise(resolve => {
//         const oldFunc = window.getSessionKey
//         window.getSessionKey = sessionKey => {
//           window.getSessionKey = oldFunc
//           resolve(sessionKey)
//         }
//         callApi('JSMessage_ClickAndPassSessionKey', false)
//       })
//     }
//   }
//   return null
// })()

/**
 * 最近浏览
 * @return {Promise|null}
 */
export const getLocalStorage = (() => {
  if (browserVersion.isAndroid() && testApi('getLocalStorage', true)) {
    return () => {
      return new Promise(resolve => {
        const funcName = `__API__${randomString(6)}`
        window[funcName] = resolve
        callApi('getLocalStorage', true, funcName)
      })
    }
  }
  if (browserVersion.isIos() && testApi('getLocalStorage', false)) {
    console.log('iosiosiosios调用')
    return () => {
      return new Promise(resolve => {
        const oldFunc = window.getLocalStorage
        window.getLocalStorage = localStorage => {
          window.getLocalStorage = oldFunc
          resolve(localStorage)
        }
        callApi('getLocalStorage', false)
      })
    }
  }
  return null
})()

// 收藏返回给app
export const collectProductResult = (() => {
  if (browserVersion.isAndroid() && testApi('collectProductResult', true)) {
    return () => {
      return new Promise(resolve => {
        const funcName = `__API__${randomString(6)}`
        window[funcName] = resolve
        callApi('collectProductResult', true, funcName)
      })
    }
  }
  if (browserVersion.isIos() && testApi('collectProductResult', false)) {
    console.log('collectProductResult调用')
    return () => {
      return new Promise(resolve => {
        const oldFunc = window.collectProductResult
        window.collectProductResult = collectResult => {
          console.log('*************')
          console.log(collectResult)
          window.collectProductResult = oldFunc
          resolve(collectResult)
        }
        callApi('collectProductResult', false)
      })
    }
  }
  return null
})()

// 获取token
export const obtainUserToken = (() => {
  if (browserVersion.isAndroid() && testApi('obtainUserToken', true)) {
    return () => {
      return new Promise(resolve => {
        const funcName = `__API__${randomString(6)}`
        window[funcName] = resolve
        callApi('obtainUserToken', true, funcName)
      })
    }
  }
  if (browserVersion.isIos() && testApi('obtainUserToken', false)) {
    console.log('iosiosiosios，obtainUserToken')
    return () => {
      return new Promise(resolve => {
        const oldFunc = window.obtainUserToken
        window.obtainUserToken = token => {
          window.obtainUserToken = oldFunc
          resolve(token)
        }
        callApi('obtainUserToken', false)
      })
    }
  }
  return null
})()

/*  =========================== 需要参数的方法 ===========================  */

/**
 * 跳转列表界面, 返回的(参数为json对象) => {}
 */
export const jumpProductListView = createArgApi('jumpProductListView', 'jumpProductListView')

/**
 * 跳转列表详情界面
 */
export const jumpProductDetailView = createArgApi('jumpProductDetailView', 'jumpProductDetailView')

/**
 * 收藏
 */
export const userCollectProduct = createArgApi('userCollectProduct', 'userCollectProduct')

/*  =========================== 不需要参数的方法 ===========================  */
/**
 *  显示顶部导航栏
 */
export const showNavigationBar = createNoArgApi('showNavigationBar', 'showNavigationBar')

/**
 *  隐藏顶部导航栏
 */
export const hideNavigationBar = createNoArgApi('hideNavigationBar', 'hideNavigationBar')

/**
 * 跳转到登录页面
 */
export const jumpToLoginView = createNoArgApi('jumpToLoginView', 'jumpToLoginView')

/**
 *  隐藏顶部导航栏
 */
export const jumpSearchView = createNoArgApi('jumpSearchView', 'jumpSearchView')

/**
 * 目的地界面
 */
export const jumpDestinationView = createNoArgApi('jumpDestinationView', 'jumpDestinationView')

/**
 * 返回上一个界面(对web而言就是返回app首页)
 */
export const backPreviousView = createNoArgApi('jumpDestinationView', 'jumpDestinationView')


export default {
  // 以下接口需传参调用
  jumpProductListView,
  jumpProductDetailView,
  userCollectProduct,
  collectProductResult,
  // 以下接口无需参数
  hideNavigationBar,
  showNavigationBar,
  jumpToLoginView,
  jumpSearchView,
  jumpDestinationView,
  backPreviousView,
  getLocalStorage,
  obtainUserToken
}
