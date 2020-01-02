import Vue from 'vue'
import Vant from 'vant'
import VueLazyload from 'vue-lazyload'

Vue.use(Vant)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('~/assets/imgs/img_error.png'),
  // loading: require('~/assets/images/gif_loading.gif'),
  attempt: 1
})
