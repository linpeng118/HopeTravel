<template>
  <section class="test-page">
    <h4>测试页面 version 1.0</h4>
    <div class="test-list">
      <nuxt-link class="test-item hand"
        v-for="item in testList"
        :key="item.path"
        :to="item.path">
        {{item.id}}.{{item.name}}
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
          {id: 1, path: '/test/vant', name: '测试vant UI'},
          {id: 2, path: '/test/appBridge', name: '测试调用移动端接口'},
          {id: 3, path: '/local_group?platform=app', name: '测试local_group'},
          {id: 4, path: '/local_play_zh?platform=app', name: '测试local_play_zh'},
          {id: 5, path: '/local_play_foreign?platform=app', name: '测试local_play_foreign'},
          {id: 6, path: '/login', name: '测试login'},
          {id: 7, path: '/order', name: '测试order'},
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
        color: teal;
        font-size: 40px;
      }
    }
  }
</style>
