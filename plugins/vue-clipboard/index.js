import Vue from 'vue'

if (process.browser) {
  const VueClipboard = require('vue-clipboard2')
  Vue.use(VueClipboard)
}
