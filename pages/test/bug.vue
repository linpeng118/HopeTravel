<template>
  <section class="test-vant">
    <div class="back">
      <nuxt-link to="/test">
        <van-icon name="arrow-left" />
      </nuxt-link>
    </div>
    <!-- 例子 -->
    <img src="https://www.tourscool.com/images/tourCity/5c6e15bfe6fb8_small.jpg?force=pc" alt="img">
  </section>
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
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
