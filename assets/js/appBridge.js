import {
  get as _get
} from 'lodash'
import {
  // getBrowserVersion,
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
 * @param {...*} args 传给api接口的参数列表
 */
function callApi(funcName, isAndroid, ...args) {
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

/**
 * 快速创建无参数接口
 * @param {string|null} androidFuncName 安卓的方法名，传null表示该平台无对应的接口
 * @param {string|null} iosFuncName ios的方法名，传null表示该平台无对应的接口
 * @return {Function|null}
 */
function createNoArgApi(androidFuncName, iosFuncName) {
  if (browserVersion.isAndroid() && androidFuncName && testApi(androidFuncName, true)) {
    return () => callApi(androidFuncName, true)
  }
  if (browserVersion.isIos() && iosFuncName && testApi(iosFuncName, false)) {
    return () => callApi(iosFuncName, false)
  }
  return null
}

/**
 * 快速创建跳转页面用的接口
 * @param {number} androidPageCode 安卓的页面代码
 * @param {string} iosFuncName ios的跳转方法名
 * @return {Function|null} 这个函数会带有一个boolean参数，表示是否需要保持当前页面不关闭，默认关闭
 */
function createJumpApi(androidPageCode, iosFuncName) {
  if (browserVersion.isAndroid() && testApi('jumpPage', true)) {
    return holdCurrentPage => {
      // 之前安卓会在jump的同时自动关闭网页。出现finishPageV2接口后就需要手动调用才关闭了
      if (!holdCurrentPage && testApi('finishPageV2', true)) {
        callApi('finishPageV2', true)
      }
      callApi('jumpPage', true, androidPageCode)
    }
  }
  if (browserVersion.isIos() && testApi(iosFuncName, false)) {
    return holdCurrentPage => {
      if (holdCurrentPage) {
        // 调用后不会关闭当前网页的接口
        const tempJumpFuncName = iosFuncName.startsWith('JSMessage_') ? `${iosFuncName}_Temp` : `JSMessage_${iosFuncName}_Temp`
        console.log(tempJumpFuncName)
        if (testApi(tempJumpFuncName, false)) {
          callApi(tempJumpFuncName, false)
          return
        }
      }
      callApi(iosFuncName, false)
    }
  }
  return null
}

/**
 * 打开某人的profile页面
 * @param {string} openId
 */
export const openProfile = (() => {
  if (browserVersion.isAndroid() && testApi('openProfile', true)) {
    return openId => callApi('openProfile', true, openId)
  }
  if (browserVersion.isIos() && testApi('JSMessage_jumpToProfileByOpenID', false)) {
    return openId => callApi('JSMessage_jumpToProfileByOpenID', false, openId)
  }
  return null
})()

/**
 * 打开某人的聊天页面。注意需要先判断好是否能够聊天，再来调用
 * @param {string} openId
 * @param {string} name 用户姓名，ios需要这个参数，显示在页面标题上
 */
export const jumpToSendMessage = (() => {
  /* eslint-disable no-unused-vars */
  if (browserVersion.isAndroid() && testApi('openChatByOpenId', true)) {
    return (openId, name) => callApi('openChatByOpenId', true, openId)
  }
  if (browserVersion.isIos() && testApi('JSMessage_jumpToConversationv2', false)) {
    return (openId, name) => callApi('JSMessage_jumpToConversationv2', false, [openId, name])
  }
  if (browserVersion.isIos() && testApi('JSMessage_jumpToConversation', false)) {
    return (openId, name) => callApi('JSMessage_jumpToConversation', false, openId)
  }
  /* eslint-enable no-unused-vars */
  return null
})()

/**
 * 异步获取本地用户登录态
 * @return {Promise|null}
 */
export const getSessionKey = (() => {
  if (browserVersion.isAndroid() && testApi('getSessionKey', true)) {
    return () => {
      return new Promise(resolve => {
        const funcName = `__API__${randomString(6)}`
        window[funcName] = resolve
        callApi('getSessionKey', true, funcName)
      })
    }
  }
  if (browserVersion.isIos() && testApi('JSMessage_ClickAndPassSessionKey', false)) {
    return () => {
      return new Promise(resolve => {
        const oldFunc = window.getSessionKey
        window.getSessionKey = sessionKey => {
          window.getSessionKey = oldFunc
          resolve(sessionKey)
        }
        callApi('JSMessage_ClickAndPassSessionKey', false)
      })
    }
  }
  return null
})()

/**
 *  隐藏顶部导航栏
 */
export const hideNavigationBar = (() => {
  if (browserVersion.isAndroid() && testApi('setShowTitleBar', true)) {
    return () => callApi('setShowTitleBar', true, false)
  }
  if (browserVersion.isIos() && testApi('JSMessage_hideNavigationBar', false)) {
    return () => callApi('JSMessage_hideNavigationBar', false)
  }
  return null
})()

/**
 *  显示顶部导航栏
 */
export const showNavigationBar = (() => {
  if (browserVersion.isAndroid() && testApi('setShowTitleBar', true)) {
    return () => callApi('setShowTitleBar', true, true)
  }
  if (browserVersion.isIos() && testApi('JSMessage_showNavigationBar', false)) {
    return () => callApi('JSMessage_showNavigationBar', false)
  }
  return null
})()

export const closeWebView = (() => {
  if (browserVersion.isAndroid() && testApi('finishPageV2', true)) {
    return () => callApi('finishPageV2', true)
  }
  if (browserVersion.isAndroid() && testApi('finishPage', true)) {
    return () => callApi('finishPage', true)
  }
  if (browserVersion.isIos() && testApi('JSMessage_closeWebVC', false)) {
    return () => callApi('JSMessage_closeWebVC')
  }
  if (browserVersion.isIos() && testApi('JSMessage_backToMeVC', false)) {
    return () => callApi('JSMessage_backToMeVC')
  }
  return null
})()




/**
 * 打开自己的profile
 */
export const jumpToProfile = createJumpApi(-3, 'jumpToProfile')
/**
 * 跳到应用商店
 */
export const jumpToRateAPP = createNoArgApi('showGoogleMarket', 'jumpToRateApp')


export default {
  // 以下接口需传参调用
  openProfile,
  jumpToSendMessage,
  // 以下接口无需参数
  jumpToProfile,
  jumpToRateAPP,
}
