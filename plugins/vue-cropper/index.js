import Vue from 'vue'
// if(process.browser) {
//   const vueCropper = require('vue-cropper')
//   Vue.use(vueCropper.default)
// }
if(process.browser) {
  const VueCropper = require('vue-cropper')
  Vue.use(VueCropper.default)
}
