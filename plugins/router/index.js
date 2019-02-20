import NProgress from 'nprogress'
import '@/assets/style/nprogress.css'
export default ({ app }) => {
  app.router.beforeEach((to,from, next) => {
    NProgress.start()
    if(to.path.indexOf('.html') >= 0) {
    }
    next()
  })
  app.router.afterEach(() => {
    NProgress.done()
  })
}
