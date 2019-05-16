import NProgress from 'nprogress'
import '@/assets/style/nprogress.css'
import apiConf from '@/apiConf.env.js'

export default ({
  app
}) => {
  app.router.beforeEach((to, from, next) => {
    console.log('router name: ', to, from);

    let reg=/(\/){2,}/
    let path = to.fullPath.replace(reg, '/')
    if(reg.test(to.fullPath)) {
      next({path})
    }
    // redirect(path)
    try {
      // M站客服系统：首页/列表/定制/签证/活动
      if (to.name === 'index' || to.name === 'product_list' || to.name === 'visa' || to.name === 'custom') {
        console.log('show customer service');
        document.body.setAttribute('class', 'show-customer-service')
      } else {
        console.log('hide customer service');
        document.body.setAttribute('class', 'hide-customer-service')
      }
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
