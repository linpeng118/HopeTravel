import NProgress from 'nprogress'
import '@/assets/style/nprogress.css'
export default ({
                  app
                }) => {
  app.router.beforeEach((to, from, next) => {
    // 获取dom
    function getDom(dom) {
      return document.querySelector(dom) || null
    }
    // 隐藏dom
    function hideDom(dom) {
      let timer
      // console.log(1, dom);
      timer = setTimeout((dom) => {
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
          hideDom(dom)
        }
      }, 1000, dom)
    }
    hideDom('#newBridge')

    // 百度商桥
    if (to.name&&to.name.indexOf('custom') >= 0) {
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
