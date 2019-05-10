import {
  get as _get
} from 'lodash'
import {
  getBrowserVersion,
  randomString
} from './utils'

export const browserVersion = getBrowserVersion()


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

setupWebViewJavascriptBridge((bridge) => {
  // APP调用web
  bridge.registerHandler('noArgTest', function (data, responseCallback) {
    console.log('ObjC called noArgTest with', data)
    var responseData = {'Javascript': 'test!'}
    console.log('JS responding with', responseData)
    responseCallback(responseData)
  })
  bridge.callHandler('testObjcCallback', {'test': '123'}, function (response) {
    console.log('JS got response', response)
  })
})


