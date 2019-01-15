<template>
  <section class="test-vant">
    <div class="back">
      <nuxt-link to="/test">
        <van-icon name="arrow-left" />
      </nuxt-link>
    </div>
    <!-- 例子 -->
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

<style lang="scss" scoped>
  .test-vant {
    min-height: 100vh;
    background-color: #eee;
    .back {
      padding: 10px;
    }
  }
</style>
