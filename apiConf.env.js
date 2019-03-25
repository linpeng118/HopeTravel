// module.exports = {
//   base: "http://enapi.dev.tourscool.net",
//   payment: "http://www.htw.tourscool.net",
//   port: 3005,
// }

let apiConfig
const dev = {
  base: 'http://api.qa.tourscool.net',
  payment: 'http://www.htw.tourscool.net',
  union: 'http://192.168.1.190:9001',
  port: 3001,
}

const qa = {
  base: 'http://api.qa.tourscool.net',
  payment: 'http://www.htw.tourscool.net',
  port: 3001,
}

// 预发布
const pre = {
  base: 'http://enapi.tourscool.net',
  payment: 'http://htwapi.tourscool.com',
  port: 3001,
}

const master = {
  base: 'http://enapi.tourscool.com',
  payment: 'http://htwapi.tourscool.com',
  port: 3001,
}

if (process.env.ENV_TYPE === 'prodMaster') {
  apiConfig = master
} else if (process.env.ENV_TYPE === 'prodPre') {
  apiConfig = pre
} else if (process.env.ENV_TYPE === 'prodQa') {
  apiConfig = qa
} else {
  apiConfig = dev
}

module.exports = apiConfig
