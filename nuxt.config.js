const TerserPlugin = require('terser-webpack-plugin')
const pkg = require('./package')
const pluginConfig = require('./config/plugins')
const apiConfig = require('./apiConf.env')
const axiosUrl = `http://127.0.0.1:${apiConfig.port}`

console.log('apiConfig:', apiConfig)
console.log('axiosUrl:', axiosUrl)



module.exports = {
  mode: 'universal',
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    ENV_TYPE: process.env.ENV_TYPE, // 添加一个环境变量
  },
  /*
   ** Headers of the page
   */
  head: {
    title: '稀饭旅行网-美国旅游-加拿大当地跟团游-欧洲旅游-澳大利亚旅游-新西兰旅游-东南亚旅游-日本旅游',
    meta: [
      {
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
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge'
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
    }, {
      src: '/polyfill/index.js',
      type: 'text/javascript',
      charset: 'utf-8',
    }, {
      src: 'https://hm.baidu.com/hm.js?9bfbbc9f24159633a14d3b4f37db769b'
    }, {
      src: 'https://hm.baidu.com/hm.js?03f91ebf7f5ac08015d9f98fa0dc22fc'
    }, {
      src: 'https://hm.baidu.com/hm.js?72a266736d8b5b47605e2d2ad18f0756'
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
    ['@nuxtjs/google-analytics', {
      id: 'UA-124174609-2'
    }],
    '@nuxtjs/sentry',
  ],
  sentry: {
    dsn: 'http://d2d1e507e07f4946b59474df0eb5ea30@sentry.tourscool.net/2', // Enter your project's DSN here
    config: {}, // Additional config
  },
  /*
   ** Axios module configuration
   */
  axios: {
    proxy: true,
    // prefix: '/api', // baseURL
    credentials: true,
    baseURL: axiosUrl, // 本地接口请求配置
  },
  // 配置代理
  proxy: {
    '/api': {
      target: `${apiConfig.base}/api/tour/v1`, // api
      pathRewrite: {
        '^/api': '/',
      },
      changeOrigin: true,
    },
    '/htwPay': {
      target: `${apiConfig.payment}`, // 支付接口
      pathRewrite: {
        '^/htwPay': '/',
      },
      changeOrigin: true,
    },
    '/union': {
      target: `${apiConfig.union}/api/tour/v1`, // 联盟
      pathRewrite: {
        '^/union': '/',
      },
      changeOrigin: true,
    }
  },
  server: {
    // 本地所起的服务配置
    port: apiConfig.port,
    // host: apiConfig.host,
  },
  /*
   ** Build configuration
   */
  build: {
    // analyze: true,
    // extractCSS与parallel不可并行：https://github.com/nuxt/nuxt.js/pull/5004
    extractCSS: (process.env.NODE_ENV !== 'production') ? false : true, // 拆分css
    maxChunkSize: 30000,
    // parallel: true, // 多进程
    // IE或者Edge下报错原因：（https://github.com/Rich-Harris/devalue/issues/16）
    // 处理
    // https://github.com/nuxt/nuxt.js/issues/4432
    // https://github.com/nuxt/nuxt.js/issues/4643
    // https://github.com/nuxt/nuxt.js/pull/4600
    babel: {
      presets({
                isServer
              }) {
        return [
          [
            "@nuxt/babel-preset-app",
            {
              targets: isServer ? {
                node: "current"
              } : {
                browsers: ["ie >= 10"],
              }
            },
            "es2015",
          ]
        ]
      },
    },
    postcss: [
      require('postcss-px2rem-exclude')({
        remUnit: 75, // 转换基本单位
        exclude: /vant/i,
      }),
      require('autoprefixer')({
        browsers: ['last 5 versions'],
      }),
    ],
    optimization: {
      minimize: (process.env.NODE_ENV !== 'production') ? false : true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true
            }
          }
        })
      ]
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.devtool = '#eval-source-map';
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
      if (ctx.isDev) {
        if (config.entry) {
          config.entry.push('babel-polyfill')
          config.entry.push('eventsource-polyfill')
        } else {
          config.entry = [
            'babel-polyfill',
            'eventsource-polyfill'
          ]
        }
      }
      if (!ctx.isDev) {
        config.devtool = false
        // 打包报错
        // const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin')
        // config.plugins = config.plugins.filter((plugin) => plugin.constructor.name !== 'UglifyJsPlugin')
        // config.plugins.push(new UglifyJSWebpackPlugin({
        //   uglifyOptions: {
        //     compress: {
        //       warnings: false,
        //       drop_debugger: true,
        //       drop_console: true
        //     }
        //   }
        // }))
      }
    },

  },
  buildDir: 'n-dist',
}
