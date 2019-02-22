import NProgress from 'nprogress'
import '@/assets/style/nprogress.css'
export default ({
  app
}) => {
  app.router.beforeEach((to, from, next) => {
    // 除了首页，列表,定制，其他页面都不弹
    if (document.querySelector('#newBridge')) {
      if (!(to.name === 'index' || to.name === 'product_list' || to.name === 'custom')) {
        document.querySelector('#newBridge').style.zIndex = -100
      } else {
        document.querySelector('#newBridge').style.zIndex = 123456789
      }
    }
    NProgress.start()
    if (to.path.indexOf('.html') >= 0) {}
    next()
  })
  app.router.afterEach(() => {
    NProgress.done()
  })
}
