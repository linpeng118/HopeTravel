let pluginConfig = [{
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
]

if (process.env.ENV_TYPE === 'prodDev') {
  pluginConfig.push({
    src: '~/plugins/vconsole',
    ssr: false
  })
}

module.exports = pluginConfig
