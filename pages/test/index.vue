<template>
  <section class="test-page">
    <h4>测试页面 version 1.0</h4>
    <div class="test-list">
      <nuxt-link class="test-item hand"
        v-for="item in testList"
        :key="item.path"
        :to="item.path"
        :style="{color: `${item.color}`}">
        {{item.id}} {{item.name}}
      </nuxt-link>
    </div>
  </section>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        testList: [
          {path: '/test/vant', name: '测试vant UI', color: '#EEC900'},
          {path: '/test/appBridge', name: '测试调用移动端接口', color: '#EEC900'},
          {id: 1, path: '/local_group?platform=app', name: '测试当地跟团页面', color: '#40E0D0'},
          {id: 2, path: '/local_play_zh?platform=app', name: '测试当地玩乐页面（国内）', color: '#40E0D0'},
          {id: 3, path: '/local_play_foreign/more_city', name: '更多城市', color: '#40E0D0'},
          {id: 4, path: '/custom', name: '私人定制页面', color: '#40E0D0'},
          {id: 5, path: '/login', name: '登录页面', color: '#40E0D0'},
          {id: 6, path: '/order', name: '订单页面', color: '#40E0D0'},
          {id: 7, path: '/product', name: '产品页面', color: '#40E0D0'},
        ]
      }
    }
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
        padding: 20px;
        border: 2px solid #abcdef;
        border-radius: 8px;
        font-size: 40px;
      }
    }
  }
</style>
