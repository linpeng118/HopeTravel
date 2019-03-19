const pkg = require('./package')
const apiPath = require('./config/api')
const pluginConfig = require('./config/plugins')
// const UglifyJSWebpackPlugin = require("uglifyjs-webpack-plugin");
// 使用BabiliPlugin代替UglifyJs
// https://github.com/nuxt/nuxt.js/issues/385
// const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
  mode: 'universal',
  env: {
    ENV_TYPE: process.env.ENV_TYPE, // 添加一个环境变量
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '稀饭旅行网-美国旅游-加拿大当地跟团游-欧洲旅游-澳大利亚旅游-新西兰旅游-东南亚旅游-日本旅游',
    meta: [{
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover',
      },
      {
        name: 'format-detection',
        content: 'telephone=no',
      },
      {
        name: 'renderer',
        content: 'webkit'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description,
      },
      {
        name: 'keywords',
        content: '稀饭旅行网为你提供美国自由行旅游,美国当地跟团游,加拿大自助游,欧洲、澳大利亚、新西兰、日本、东南亚旅游,美国邮轮游等出境游预订服务,提供个性化定制旅游服务,境外旅游线路行程,景点门票低价在线预订尽在稀饭旅行网'
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
    }],
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
  plugins: pluginConfig,
  render: {
    resourceHints: false,
  },
  /*
   ** middleware
   */
  router: {},
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
      target: `${apiPath.base}/api/tour/v1`, // api
      pathRewrite: {
        '^/api': '/',
      },
      changeOrigin: true,
    },
    '/play': {
      target: 'http://192.168.1.91:8888/api/tour/v1', // 本地测试
      pathRewrite: {
        '^/play': '/',
      },
      changeOrigin: true,
    },
    '/order': {
      target: `${apiPath.payment}/api/v1`, // 订单接口
      pathRewrite: {
        '^/order': '/',
      },
      changeOrigin: true,
    },
    '/payment': {
      target: `${apiPath.payment}/payment`, // 支付
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
    vendor: [
      'babel-polyfill',
      'axios',
      'lodash',
      '~/plugins/vant',
      '~/plugins/vue-swiper',
      '~/plugins/vue-clipboard',
      '~/plugins/vue-cropper'
    ],
    // analyze: true,
    extractCSS: true, // 拆分css
    // babel: {
    //   cacheDirectory: undefined,
    //   presets: ['@nuxt/babel-preset-app', {
    //     targets: {
    //       ie: 10
    //     }
    //   }]
    // },
    // 多进程
    parallel: true,
    postcss: [
      require('postcss-px2rem-exclude')({
        remUnit: 75, // 转换基本单位
        exclude: /vant/i,
      }),
      require('autoprefixer')({
        browsers: ['last 5 versions'],
      }),
    ],
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'eval-source-map';
        // 别名
        // Object.assign(config.resolve.alias, {
        //   Components: path.resolve(__dirname, 'components'),
        //   Plugins: path.resolve(__dirname, 'plugins'),
        //   Assets: path.resolve(__dirname, 'assets'),
        //   Static: path.resolve(__dirname, 'static')
        // })
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
      if (!ctx.isDev) {
        config.devtool = false
      }
    },
  },
  buildDir: 'n-dist',
}
