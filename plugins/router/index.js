import NProgress from 'nprogress'
import '@/assets/style/nprogress.css'
export default ({ app }) => {
  app.router.beforeEach((to,from, next) => {
    NProgress.start()
    if(to.path.indexOf('.html') >= 0) {
      console.log(to)
      // product/detail?productId=1445
      to.fullPath = 'product/detail?productId=1445'
      to.path = 'product/detail'
      to.query = {
        productId: '1445'
      }
    }
    next()
  })
  app.router.afterEach(() => {
    NProgress.done()
  })
}
