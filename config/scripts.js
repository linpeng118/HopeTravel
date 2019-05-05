// const apiConfig = require('../apiConf.env.js')

let scriptArr = [{
  src: '/flexible/flexible.js',
  type: 'text/javascript',
  charset: 'utf-8',
}, {
  src: '/polyfill/index.js',
  type: 'text/javascript',
  charset: 'utf-8',
},]

// if (apiConfig.customerService === '53kf') {
//   scriptArr.push({
//     src: 'https://tb.53kf.com/code/code/10181581/2'
//   })
// }

// if (apiConfig.customerService === 'baidu') {
//   scriptArr.push({
//     src: 'https://hm.baidu.com/hm.js?9bfbbc9f24159633a14d3b4f37db769b'
//   })
// }

module.exports = scriptArr
