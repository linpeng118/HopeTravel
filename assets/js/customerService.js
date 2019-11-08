/**
 * 客服系统;分为3个连接：
 * 全局: 
 *   https://tb.53kf.com/code/code/10181581/2
 *   短链接：https://tb.53kf.com/code/client/10181581/2
 * 定制页面:
 *   https://tb.53kf.com/code/code/10181581/3
 *   短链接：https://tb.53kf.com/code/client/10181581/3
 * 签证页面:
 *   https://tb.53kf.com/code/code/10181581/4
 *   短链接：https://tb.53kf.com/code/client/10181581/4
 * @param {Object} page 'visa'或'custom'
 */
import {replaceServerUrl} from './utils'
export default function(page) {
    let url = replaceServerUrl()
    window.open(url, '_self')
}


