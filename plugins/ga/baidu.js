if (process.client && process.env.NODE_ENV === 'production') {
  var _hmt = _hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?9bfbbc9f24159633a14d3b4f37db769b";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
}

export default ({
  app: {
    router
  },
  store
}) => {
  /*
   ** 每次路由变更时进行pv统计
   */
  router.afterEach((to, from) => {
    try {
      if (process.client && process.env.NODE_ENV === 'production') {
        window._hmt = window._hmt || []
        window._hmt.push(['_trackPageview', to.fullPath])
      }
    } catch (e) {}
  })
}
