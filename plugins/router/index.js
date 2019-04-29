import NProgress from 'nprogress'
import '@/assets/style/nprogress.css'

// 获取dom
function getDom(dom) {
  return document.querySelector(dom) || null
}

export default ({
  app
}) => {
  app.router.beforeEach((to, from, next) => {
    let that = this

    try {
      // 隐藏dom
      function hideDom(dom) {
        let timer
        // console.log(1, dom);
        timer = setTimeout((dom, that) => {
          // console.log(2, dom);
          const hideDom = getDom(dom)
          if (hideDom) {
            console.log('hideDom', hideDom);
            if (!(to.name === 'index' || to.name === 'product_list')) {
              console.log('#newBridge hide');
              hideDom.style.display = 'none'
            } else {
              console.log('#newBridge show');
              hideDom.style.display = 'block'
            }
          } else {
            clearInterval(timer)
            that.hideDom(dom)
          }
        }, 3000, dom, that)
      }

      // 隐藏百度商桥
      that.hideDom('#newBridge')

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
