import {
  get as _get
} from 'lodash'
import {
  getBrowserVersion,
} from './utils'

const browserVersion = getBrowserVersion()

// 调用IOS
function setupWebViewJavascriptBridge(callback) {
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
}

// 调用安卓
function connectWebViewJavascriptBridge(callback) {
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

export default {
  // {isIos(), isAndroid()}
  browserVersion,
  callHandler(name, data, callback) {
    if (browserVersion.isIos()) {
      setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler(name, data, callback)
      })
    } else if (browserVersion.isAndroid()) {
      connectWebViewJavascriptBridge(bridge => {
        bridge.init(function (data, callback) {
          console.log('data', data);
          if (callback) {
            callback(data);
          }
        })
      })
    }
  },
  registerHandler(name, callback) {
    if (browserVersion.isIos()) {
      setupWebViewJavascriptBridge((bridge) => {
        bridge.registerHandler(name, (data, responseCallback) => {
          callback(data, responseCallback)
        })
      })
    } else if (browserVersion.isAndroid()) {
      connectWebViewJavascriptBridge(bridge => {
        bridge.registerHandler(name, function (data, responseCallback) {
          if (responseCallback) {
            responseCallback(data);
          }
        })
      })
    }
  }
}
