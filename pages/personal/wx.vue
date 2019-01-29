<template>
  <div class="personal-wx-page">
    <normal-header title="微信公众号" />
    <div class="code"></div>
    <p class="text">欢迎扫描关注</p>
    <p class="name">{{publicName}}</p>
    <van-button class="btn-copy"
      round
      v-clipboard:copy="publicName"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">点击复制公众号</van-button>
  </div>
</template>

<script>
  import NormalHeader from '@/components/header/normal'

  export default {
    components: {
      NormalHeader
    },
    data() {
      return {
        publicName: 'zmcslxs'
      }
    },
    computed: {},
    mounted() {},
    methods: {
      onCopy(e) {
        this.$toast("复制成功");
      },
      // 复制失败
      onError(e) {
        this.$toast("复制失败");
      },
    },
  }
</script>

<style lang="scss" scoped>
  .personal-wx-page {
    text-align: center;
    font-family: PingFang SC;
    .code {
      margin: 104px auto 0;
      width: 320px;
      height: 320px;
      background: url("../../assets/imgs/qr_code@3x.png") no-repeat 0 0/100% 100%;
    }
    .text {
      margin-top: 50px;
      font-size: 28px;
      font-weight: 300;
      line-height: 40px;
      color: #191919;
    }
    .name {
      margin-top: 26px;
      font-size: 28px;
      font-weight: 300;
      line-height: 40px;
      color: #399ef6;
    }
    .btn-copy {
      margin-top: 20px;
      height: 56px;
      line-height: 54px;
      background: #fff;
      border: 2px solid #399ef6;
      color: #399ef6;
      font-size: 24px;
      border-radius: 28px;
    }
  }
</style>