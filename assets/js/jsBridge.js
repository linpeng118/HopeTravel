import {
  getBrowserVersion,
} from './utils'

export const browserVersion = getBrowserVersion()

// 注册事件监听，初始化(bridge===WebViewJavascriptBridge)
function setupWebViewJavascriptBridge(callback) {
  if (browserVersion.isIos()) {
    // IOS
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  } else if (browserVersion.isAndroid()) {
    // Android
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady'
        , function () {
          callback(WebViewJavascriptBridge)
        },
        false
      );
    }
  }
}

export default {
  // {isIos(), isAndroid()}
  browserVersion,
  // web调用app
  callHandler(name, data, callback) {
    setupWebViewJavascriptBridge((bridge) => {
      if (browserVersion.isAndroid()) {
        bridge.init((data, responseCallback) => {})
      }
      bridge.callHandler(name, data, callback)
    })
  },
  // app调用web
  registerHandler(name, callback) {
    setupWebViewJavascriptBridge((bridge) => {
      if (browserVersion.isAndroid()) {
        bridge.init((data, responseCallback) => {})
      }
      bridge.registerHandler(name, (data, responseCallback) => {
        callback(data, responseCallback)
      })
    })
  }
}
