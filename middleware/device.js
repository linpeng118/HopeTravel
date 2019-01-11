/*
 * @Author: _collin
 * @Date: 2019-01-11 15:02:32
 * @LastEditTime: 2019-01-11 15:57:11
 * 移动端和web端联调
 */
export default (context) => {
  context.userAgent = process.server ?
    context.req.headers["user-agent"] :
    navigator.userAgent;
  // 给全局上下文添加一个属性来保存我们返回的匹配信息
  context.device = getDeviceType(context.userAgent);
  // 这里注入到store,方便获取,以后可能很多页面会使用到设备类型
  context.store.commit("setDeviceType", context.device);
  // 若是判断UA非移动端的,就在这里做处理了..
  // 这个可以重定向到外部网站
  // context.redirect(status,url) 
  // 若是内部访问可以直接用router对象push
  //   if (context.deviceType.type === "pc") {
  //   }
}

/**
 * 设备检测
 * @param ua userAgent
 * @return { app: true, ios: true, android: false }
 */
export function getDeviceType(ua) {
  const uaInfo = {
    app: /(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/i.test(ua), // 是否移动端
    ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(ua), // 是否ios
    android: /Android/i.test(ua) || /Linux/i.test(ua), // 是否ios
  }
  return uaInfo
}
