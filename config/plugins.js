let pluginConfig

let plugins = [
  {
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
    src: '~/assets/js/mixins/shareReport',
    ssr: false,
  },
  //vuex禁止ssr
  {
    src: '~/plugins/vuex-persist',
    ssr: false
  },
  {
    src: '~/plugins/vue-clipboard',
    ssr: false
  },
  {
    src: '~/plugins/axios',
    ssr: false
  },
  {
    src: '~/plugins/router',
    ssr: false
  },
  // 统计
  {
    src: '~/plugins/ga/facebook.js',
    ssr: false
  },
  // {
  //   src: '~/plugins/vconsole',
  //   ssr: false
  // },
]

let devPlugins = [
  {
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
  {
    src: '~/plugins/axios',
    ssr: false
  },
  {
    src: '~/plugins/router',
    ssr: false
  },
  // 统计
  {
    src: '~/plugins/ga/facebook.js',
    ssr: false
  },
  // {
  //   src: '~/plugins/vconsole',
  //   ssr: false
  // },
  //vuex禁止ssr
  {
    src: '~/plugins/vuex-persist',
    ssr: false
  }
]

if (process.env.ENV_TYPE === 'prodDev') {
  pluginConfig = devPlugins
} else {
  pluginConfig = plugins
}

module.exports = pluginConfig
