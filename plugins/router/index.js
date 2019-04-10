import NProgress from 'nprogress'
import '@/assets/style/nprogress.css'
export default ({
  app
}) => {
  app.router.beforeEach((to, from, next) => {
    console.log(1111111111)

    // 除了首页，列表,定制，其他页面都不弹
    setTimeout(() => {
      let newBridgeDom = document.querySelector('#newBridge')
      if (!newBridgeDom) {
        return
      }
      if (!(to.name === 'index' || to.name === 'product_list')) {
        newBridgeDom.style.display = 'none'
      } else {
        newBridgeDom.style.display = 'block'
      }
    }, 3000)
    if (to.name.indexOf('custom') >= 0) {
      var _hmt = _hmt || [];
      (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?72a266736d8b5b47605e2d2ad18f0756";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    }
    NProgress.start()
    if (to.path.indexOf('.html') >= 0) {}
    next()
  })
  app.router.afterEach(() => {
    NProgress.done()
  })
}
