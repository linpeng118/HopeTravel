<template>
  <section class="test-vant">
    <div class="back">
      <nuxt-link to="/test">
        <van-icon name="arrow-left" />
      </nuxt-link>
    </div>
    <!-- 例子 -->
    <van-button class="mt-10"
      type="primary"
      size="large"
      @click="onTestGa">测试ga</van-button>
    <van-button class="mt-10"
      type="primary"
      size="large"
      @click="onTestHmt">测试baidu</van-button>
    <van-button class="mt-10"
      type="primary"
      size="large"
      @click="onTestFbq">测试fbq</van-button>
  </section>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
      }
    },
    methods: {
      onTestGa() {
        console.log(ga)
        ga('track', 'test');
        // ga('track', 'Lead');
      },
      onTestHmt() {
        console.log(_hmt)
        _hmt.push('track', 'test');
      },
      onTestFbq() {
        try {
          console.log(fbq)
          fbq('track', 'test');
        } catch (error) {
          console.log(error)
        }
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
