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
