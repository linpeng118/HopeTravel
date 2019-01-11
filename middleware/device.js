/*
 * @Author: _collin
 * @Date: 2019-01-11 15:02:32
 * @LastEditTime: 2019-01-11 15:21:10
 * 移动端和web端联调
 */

import {
  getDeviceType
} from "@/assets/js/utils";

export default function (context) {
  context.userAgent = process.server ?
    context.req.headers["user-agent"] :
    navigator.userAgent;
  // 给全局上下文添加一个属性来保存我们返回的匹配信息
  context.deviceType = getDeviceType(context.userAgent);
  // 这里注入到store,是因为我部分页面需要判断机型请求不同的数据,
  // 你们没有用到的话可以移除
  console.log(context.deviceType)
  //   context.store.commit("SetDeviceType", context.deviceType);

  // 若是判断UA非移动端的,就在这里做处理了..
  // context.redirect(status,url) 这个可以重定向到外部网站
  // 若是内部访问可以直接用router对象push
  //   if (context.deviceType.type === "pc") {
  //   }
}
