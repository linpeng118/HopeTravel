import NProgress from 'nprogress'
import '@/assets/style/nprogress.css'
import apiConf from '@/apiConf.env.js'

export default ({
  app
}) => {
  app.router.beforeEach((to, from, next) => {
    // 获取dom
    function getDom(domName) {
      return document.querySelector(domName) || null
    }
    // 隐藏dom
    function hideDom(domName) {
      let timer
      // console.log(1, domName);
      timer = setTimeout(() => {
        const dom = getDom(domName)
        if (dom) {
          console.log('dom', dom);
          if (!(to.name === 'index' || to.name === 'product_list')) {
            console.log('#newBridge hide');
            dom.style.display = 'none'
          } else {
            console.log('#newBridge show');
            dom.style.display = 'block'
          }
        } else {
          try {
            clearInterval(timer)
            hideDom(domName)
          } catch (error) {
            console.log(error)
          }
        }
      }, 4000, domName)
    }
    try {
      NProgress.start()
      if (to.path.indexOf('.html') >= 0) {}
    } catch (error) {
      console.log(error)
    }
    next()
  })
  app.router.afterEach(() => {
    NProgress.done()
  })
}
