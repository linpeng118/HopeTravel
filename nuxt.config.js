const pkg = require('./package')

// let nuxtPlugins = [{
//     src: '~/plugins/vant',
//     ssr: true,
//   },
//   {
//     src: '~/plugins/vue-swiper',
//     ssr: false,
//   },
//   {
//     src: '~/assets/js/appBridge',
//     ssr: false,
//   },
//   '~/plugins/axios/nuxtaxios',

// ]
// if (process.env.ENV_TYPE === 'prodDev') {
//   nuxtPlugins = nuxtPlugins.concat([{
//     src: '~/plugins/vconsole',
//     ssr: false,
//   }])
//   console.log('dev环境')
// } else if (process.env.ENV_TYPE === 'prodQa') {
//   console.log('qa环境')
// }


module.exports = {
  mode: 'universal',
  env: {
    ENV_TYPE: process.env.ENV_TYPE, // 添加一个环境变量
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '',
    meta: [{
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description,
      },
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    }, ],
    script: [{
      src: '/flexible/flexible.js',
      type: 'text/javascript',
      charset: 'utf-8',
    }, ],
    __dangerouslyDisableSanitizers: ['script'],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff',
  },

  /*
   ** Global CSS
   */
  css: ['@/assets/style/index.scss', 'vant/lib/index.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{
      src: '~/plugins/vant',
      ssr: true,
    },
    {
      src: '~/plugins/vue-swiper',
      ssr: false,
    },
    {
      src: '~/assets/js/appBridge',
      ssr: false,
    },
    {
      src: '~/assets/js/mixins/verifyCode',
      ssr: false,
    },
    {
      src: '~/plugins/vue-cropper',
      ssr: false
    },
    {
      src: '~/plugins/vue-clipboard',
      ssr: false
    },
    '~/plugins/axios/nuxtaxios'
  ],
  /*
   ** middleware
   */
  router: {
    // middleware: ["device"],
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    proxy: true,
    // prefix: '/api', // baseURL
    credentials: true,
  },
  proxy: {
    // 配置代理
    '/api': {
      target: 'http://m20.tourscool.net/api/tour/v1', // api主机
      pathRewrite: {
        '^/api': '/',
      },
      changeOrigin: true,
    },
    '/play': {
      target: 'http://192.168.1.91:8888/api/tour/v1', // api主机
      pathRewrite: {
        '^/play': '/',
      },
      changeOrigin: true,
    },
    '/order': {
      target: 'http://www.htw.tourscool.net/api/v1', // api主机
      pathRewrite: {
        '^/order': '/',
      },
      changeOrigin: true,
    },
    '/payment': {
      target: 'http://www.htw.tourscool.net/payment', // api主机
      pathRewrite: {
        '^/payment': '/',
      },
      changeOrigin: true,
    },
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ['axios', 'lodash', '~/plugins/vant', '~/plugins/vue-swiper', '~/plugins/vue-clipboard', '~/plugins/vue-cropper'],
    postcss: [
      require('postcss-px2rem-exclude')({
        remUnit: 75, // 转换基本单位
        exclude: /vant/i,
      }),
      require('autoprefixer')({
        browsers: ['last 3 versions'],
      }),
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
  buildDir: 'n-dist',
}
