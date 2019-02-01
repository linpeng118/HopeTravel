let apiPath
const dev = {
  base: 'http://api.qa.tourscool.net',
  payment: 'http://www.htw.tourscool.net',
}

const qa = {
  base: 'http://api.qa.tourscool.net',
  payment: 'http://www.htw.tourscool.net',
}

const master = {
  base: 'http://api.qa.tourscool.com',
  payment: 'http://www.htw.tourscool.com',
}

if (process.env.ENV_TYPE === 'prodMaster') {
  apiPath = master
} else if (process.env.ENV_TYPE === 'prodQa') {
  apiPath = qa
} else {
  apiPath = dev
}

module.exports = apiPath
