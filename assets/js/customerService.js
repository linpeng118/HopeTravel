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
export default function(page) {
    if (page === 'visa') {
        // 签证页面
        if (process.env.customerService === "baidu") {
            window.location.href = 'http://p.qiao.baidu.com/cps/chat?siteId=13206734&userId=26301226'
        }
        if (process.env.customerService === "53kf") {
            window.location.href = 'https://tb.53kf.com/code/client/10181581/4'
        }
    } else if (page === 'custom') {
        // 定制页面
        if (process.env.customerService === "baidu") {
            window.location.href = 'http://p.qiao.baidu.com/cps/chat?siteId=12918104&userId=26301226'
        }
        /* if (process.env.customerService === "53kf") {
          window.location.href = 'https://tb.53kf.com/code/client/10181581/3'
        } */
    } else {
        // 全局
        if (process.env.customerService === "baidu") {
            window.location.href = 'http://p.qiao.baidu.com/cps/chat?siteId=12524949&userId=26301226'
        }
        /* if (process.env.customerService === "53kf") {
          window.location.href = 'https://tb.53kf.com/code/client/10181581/2'
        } */
    }
}