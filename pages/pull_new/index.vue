<template>
  <div class="pull-new-page">
    <div class="price-content">
      <header>
        <h1 class="title">稀饭大礼</h1>
        <img class="img-desc"
          src="~/assets/imgs/invite/send_2600@2x.png"
          alt="">
      </header>
      <div class="price-box">
        <img class="img-box"
          src="~/assets/imgs/invite/box@2x.png"
          alt="">
      </div>
      <van-button class="btn-receive"
        @click="onReceive"
        type="default">立刻领取</van-button>
    </div>
    <h1 class="rule-title">活动规则</h1>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import loginHeader from '@/components/header/loginHeader'

  export default {
    data() {
      return {
        // 重定向地址
        redirect: this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '',
      }
    },
    computed: {
      // ...mapState({
      //   vxPage: state => state.login.page // 登录展示哪个页面
      // }),
    },
    methods: {
      onReceive() {
        console.log('onReceive')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pull-new-page {
    height: 100%;
    min-height: 100vh;
    text-align: center;
    background: #abc url("~assets/imgs/invite/bg_new.png") no-repeat center/100%;
    overflow: hidden;
    .price-content {
      margin: 668px auto 0;
      padding-bottom: 36px;
      width: 620px;
      background: #fff;
      border-radius: 20px;
      border: 10px solid #ffa53c;
      .title {
        margin-top: 12px;
        text-align: center;
        font-size: 48px;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 66px;
        color: rgba(0, 0, 0, 1);
      }
      .img-desc {
        width: 346px;
        height: 44px;
      }
      .price-box {
        margin-top: 28px;
        .img-box {
          width: 199px;
          height: 166px;
        }
      }
      .btn-receive {
        margin-top: 30px;
        width: 538px;
        height: 78px;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: 600;
        line-height: 50px;
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
    .rule-title {
      margin-top: 30px;
      width: 128px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 44px;
      color: rgba(255, 255, 255, 1);
    }
  }
</style>
