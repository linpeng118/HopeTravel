let apiPath
const dev = {
  base: 'http://api.qa.tourscool.net',
  payment: 'http://www.htw.tourscool.net',
}

const qa = {
  base: 'http://.apiqa.tourscool.net',
  payment: 'http://www.htw.tourscool.net',
}

// 预发布
const pre = {
  base: 'http://api.tourscool.net',
  payment: 'http://htwapi.tourscool.com',
}

const master = {
  base: 'http://api.tourscool.com',
  payment: 'http://htwapi.tourscool.com',
}

if (process.env.ENV_TYPE === 'prodMaster') {
  apiPath = master
} else if (process.env.ENV_TYPE === 'prodPre') {
  apiPath = pre
} else if (process.env.ENV_TYPE === 'prodQa') {
  apiPath = qa
} else {
  apiPath = dev
}

module.exports = apiPath
