import './WebViewJavascriptBridge.js'
import {
  getBrowserVersion,
} from './utils'

export const browserVersion = getBrowserVersion()

// 注册事件监听，初始化(bridge===WebViewJavascriptBridge)
function setupWebViewJavascriptBridge(callback) {
  // IOS
  if (browserVersion.isIos()) {
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

//回调函数，接收java发送来的数据
// connectWebViewJavascriptBridge(function (bridge) {
//   //默认接收
//   bridge.init(function (message, responseCallback) {
//     document.getElementById("show").innerHTML = '默认接收到Java的数据： ' + message;

//     var responseData = 'js默认接收完毕，并回传数据给java';
//     // 回传数据给java
//     responseCallback(responseData);
//   });

//   //指定接收，参数functionInJs 与java保持一致
//   bridge.registerHandler("functionInJs", function (data, responseCallback) {
//     document.getElementById("show").innerHTML = '指定接收到Java的数据： ' + data;

//     var responseData = 'js指定接收完毕，并回传数据给java';
//     // 回传数据给java
//     responseCallback(responseData);
//   });
// })