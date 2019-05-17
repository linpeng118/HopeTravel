<template>
  <section class="test-page">
    <h4>version 1.1.0</h4>
    <div class="test-list">
      <h5>功能调试</h5>
      <nuxt-link class="test-item hand"
        v-for="item in testList"
        :key="item.path"
        :to="item.path"
        :style="{color: `${item.color}`}">
        {{item.id}} {{item.name}}
      </nuxt-link>
    </div>
    <div class="test-list">
      <h5>页面测试</h5>
      <nuxt-link class="test-item hand"
        v-for="(item,idx) in testPages"
        :key="item.path"
        :to="item.path"
        :style="{color: `${item.color}`}">
        {{idx+1}}. {{item.name}}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
  export default {
    components: {},
    validate({params, query}) {
      // url: xxx.net?page=test 防止外人访问
      if (query.page === 'test') {
        return true
      } else {
        return false
      }
    },
    data() {
      return {
        testList: [
          {path: '/test/vant', name: '测试vant UI', color: '#EEC900'},
          {path: '/test/appBridge', name: '测试调用移动端接口', color: '#EEC900'},
          {path: '/test/jsBridge', name: '测试jsBridge', color: '#D93025'},
          {path: '/test/bug', name: '测试bug', color: '#EEC900'},
          {path: '/test/ga', name: '测试统计', color: '#EEC900'},
        ],
        testPages: [
          {path: '/invite_friend?platform=app&language=zh-CN&currency=CNY&app_version=1.4.0&phone_type=ios', name: '拉新活动', color: '#40E0D0'},
          {path: '/local_group?platform=app', name: '测试当地跟团页面', color: '#40E0D0'},
          {path: '/local_play_zh?platform=app&language=zh-CN&currency=CNY&app_version=1.4.0&phone_type=ios', name: '测试当地玩乐页面（国内）', color: '#40E0D0'},
          {path: '/local_play_foreign/more_city', name: '更多城市', color: '#40E0D0'},
          {path: '/custom?platform=app', name: '私人定制页面', color: '#40E0D0'},
          {path: '/login', name: '登录页面', color: '#40E0D0'},
          {path: '/order', name: '订单页面', color: '#40E0D0'},
          {path: '/product', name: '产品页面', color: '#40E0D0'},
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>
  .test-page {
    min-height: 100vh;
    padding: 30px;
    .test-list {
      margin-top: 30px;
      .test-item {
        display: inline-block;
        width: 100%;
        margin: 10px 0;
        padding: 15px;
        border: 2px solid #abcdef;
        border-radius: 8px;
        font-size: 40px;
      }
    }
  }
</style>
