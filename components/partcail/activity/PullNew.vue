<template>
  <div class="pull-new-comp">
    <img class="oh"
      src="~/assets/imgs/activity/pull_new/oh.png"
      alt="">
    <h2 class="title">活动已结束</h2>
    <img class="qrcode"
      src="~/assets/imgs/activity/pull_new/qrcode.jpg"
      alt=""
      srcset="">
    <p class="text mt-38">关注HopeTravel旅行公众号</p>
    <p class="text">及时获得优惠活动信息</p>
    <van-button class="btn-copy"
      round
      v-clipboard:copy="publicName"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">复制公众号名称</van-button>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        publicName: 'zmcslxs'
      }
    },
    methods: {
      onCopy(e) {
        this.$toast(this.$t('shareComp.copySuccess'));
      },
      // 复制失败
      onError(e) {
        this.$toast(this.$t('shareComp.copyFail'));
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pull-new-comp {
    margin: 0 auto;
    text-align: center;
    border-radius: 32px;
    width: 686px;
    height: 1275px;
    background: #fff;
    .oh {
      margin-top: 56px;
      width: 365px;
      height: 406px;
    }
    .title {
      margin-top: 38px;
      font-size: 52px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 74px;
      color: rgba(0, 0, 0, 1);
    }
    .qrcode {
      width: 392px;
      height: 392px;
    }
    .text {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 44px;
      color: rgba(0, 0, 0, 1);
    }
    .btn-copy {
      margin-top: 40px;
      width: 100%;
      max-width: 620px;
      height: 90px;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      background: linear-gradient(
        90deg,
        rgba(253, 179, 0, 1) 0%,
        rgba(253, 165, 0, 1) 100%
      );
      box-shadow: 0px 4px 12px rgba(165, 69, 10, 0.16);
      border-radius: 44px;
    }
  }
</style>
