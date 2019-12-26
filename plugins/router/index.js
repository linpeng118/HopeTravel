import '@/assets/style/nprogress.css'
import apiConf from '@/apiConf.env.js'
import {getSessionStore, setSessionStore} from '@/assets/js/utils'

export default ({
  app
}) => {
  app.router.beforeEach((to, from, next) => {
    console.log('router name: ', to, from)
    let traceCode = getSessionStore('traceCode') || ''
    setSessionStore('traceCode', to.query.trace_code || traceCode)

    let reg=/(\/){2,}/
    let path = to.fullPath.replace(reg, '/')
    if(reg.test(to.fullPath)) {
      next({path})
    }
    try {
      // M站客服系统：首页/列表/定制/签证/活动
      if (to.name === 'category-search1' || to.name === 'visa' || to.name === 'custom' || to.name === 'city_home-id') {
        console.log('show customer service');
        document.body.setAttribute('class', 'show-customer-service')
      } else {
        console.log('hide customer service');
        document.body.setAttribute('class', 'pr-dl hide-customer-service')
      }
      
      if (to.path.indexOf('.html') >= 0) {}
    } catch (error) {
      console.log(error)
    }
    next()
  })
}
