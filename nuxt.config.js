require('babel-polyfill');
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
    title: '',
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
        hid: 'description',
        name: 'description',
        content: pkg.description,
      }
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
    }, {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.min.js'
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
    vendor: ['babel-polyfill',
      'axios', 'lodash', '~/plugins/vant', '~/plugins/vue-swiper', '~/plugins/vue-clipboard', '~/plugins/vue-cropper'
    ],
    // analyze: true,
    babel: {
      presets: ({
        isServer
      }) => {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              buildTarget: isServer ? 'server' : 'client', // for auto import polyfill
              useBuiltIns: 'entry'
            }
          ]
        ]
      }
    },
    parallel: true, // 多进程
    postcss: [
      require('postcss-px2rem-exclude')({
        remUnit: 75, // 转换基本单位
        exclude: /vant/i,
      }),
      require('autoprefixer')({
        browsers: ['last 3 versions'],
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
