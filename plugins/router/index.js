import NProgress from 'nprogress'
import '@/assets/style/nprogress.css'
export default ({ app }) => {
  console.log('router')
  app.router.beforeEach((to,from, next) => {
    NProgress.start()
    next()
  })
  app.router.afterEach(() => {
    NProgress.done()
  })
}
