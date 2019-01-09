<template>
  <section class="test-vant">
    <div>
      <nuxt-link to="/test">
        首页
      </nuxt-link>
    </div>
    <van-checkbox v-model="checked">复选框</van-checkbox>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger round">危险按钮</van-button>
    <van-button plain
      type="primary"
      size="large">朴素按钮</van-button>
    <van-button plain
      type="danger"
      size="large">朴素按钮</van-button>
  </section>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        checked: true,
      }
    }
  }
</script>

<style>
  .test-vant {
    min-height: 100vh;
    background-color: #eee;
  }
</style>
