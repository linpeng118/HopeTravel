/*
 ** 只在生产模式的客户端中使用
 */
if (process.client && process.env.NODE_ENV === 'production') {
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '533828070373005');
  fbq('track', 'PageView');
  window.fbq = fbq
}

export default ({
  app: {
    router
  },
  inject
}) => {
  /*
   ** 每次路由变更时进行pv统计
   */
  router.afterEach((to, from) => {
    // try {
    //   fbq('set', 'page', to.fullPath)
    //   fbq('send', 'pageview')
    // } catch (e) {
    //   console.log('fbq', e)
    // }
  })
}
