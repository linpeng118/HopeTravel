<template>
  <div class="pull-new-page">
    <!-- title -->
    <!-- <van-nav-bar class="nav-title tours-no-bb"
      ref="loginHeader"
      :title="'新人立减'"
      fixed>
    </van-nav-bar> -->
    <!-- 内容 -->
    <div class="price-content-wrap">
      <!-- 默认 -->
      <div class="price-content default"
        v-if="receiveStatus===RECEIVE_TYPE.default">
        <h1 class="title">稀饭大礼</h1>
        <img class="img-desc"
          src="~/assets/imgs/invite/send_2600@2x.png"
          alt="">
        <div class="price-box">
          <img class="img-box"
            src="~/assets/imgs/invite/box@2x.png"
            alt="">
        </div>
        <!-- 区号+手机号 -->
        <area-code-default :proAreaCode="areaCode"
          :proPhone.sync="phone" />
        <van-button class="button-activity"
          :disabled="submiting"
          @click="onReceive"
          type="default">立刻领取</van-button>
      </div>
      <!-- 领取成功 -->
      <div class="price-content success"
        v-if="receiveStatus===0">
        <img class="img-success mt-20"
          src="~/assets/imgs/invite/reveive_suc@2x.png"
          alt="">
        <div class="price-box">
          <img class="img-box"
            src="~/assets/imgs/invite/box@2x.png"
            alt="">
        </div>
        <p class="tip-text">已放入稀饭旅行APP【我的-我的券】</p>
        <van-button class="button-activity mt-26"
          @click="onOpenApp"
          type="default">打开稀饭APP查看</van-button>
      </div>
      <!-- 重新输入 -->
      <div class="price-content old"
        v-if="receiveStatus===RECEIVE_TYPE.old">
        <div class="price-box">
          <img class="img-box"
            src="~/assets/imgs/invite/box@2x.png"
            alt="">
        </div>
        <p class="tip-text old-tip">{{msg}}</p>
        <van-button class="button-activity mt-26"
          type="default"
          @click="onAgain">重新输入</van-button>
      </div>
      <!-- 已领取 -->
      <div class="price-content again"
        v-if="receiveStatus===RECEIVE_TYPE.again">
        <div class="price-box">
          <img class="img-box"
            src="~/assets/imgs/invite/box@2x.png"
            alt="">
        </div>
        <p class="tip-text again-tip">{{msg}}</p>
        <!-- 打开稀饭APP查看 -->
        <van-button class="button-activity mt-26"
          @click="onOpenApp"
          type="default">打开稀饭APP查看</van-button>
      </div>
      <h1 class="rule-title">活动规则</h1>
      <section class="rule-desc"
        v-html="rules"></section>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import loginHeader from '@/components/header/loginHeader'
  import areaCodeDefault from '@/components/input/areaCodeDefault'
  import {getPullNewRules, getCouponsExternal} from '@/api/activity'
  import {RECEIVE_TYPE} from '@/assets/js/consts/activity'

  export default {
    components: {
      areaCodeDefault
    },
    data() {
      return {
        RECEIVE_TYPE,
        // 重定向地址
        redirect: this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '',
        // 活动id
        id: '',
        // 活动规则
        rules: '',
        // 区号与电话
        areaCode: '86',
        phone: '',
        // 是否正在提交
        submiting: false,
        // 领取状态
        receiveStatus: RECEIVE_TYPE.default
      }
    },
    computed: {
      // ...mapState({
      //   vxPage: state => state.login.page // 登录展示哪个页面
      // }),
    },
    mounted() {
      this.init()
    },
    methods: {
      async init() {
        const {code, msg, data} = await getPullNewRules({
          type: 'reduction'
        })
        if (code === 0) {
          this.id = data.id
          this.rules = data.rules
        }
      },
      async onReceive() {
        this.submiting = true
        console.log('onReceive', `${this.areaCode}-${this.phone}`)
        const {code, msg, data} = await getCouponsExternal({
          id: this.id,
          phone: `${this.areaCode}-${this.phone}`
        })
        this.msg = msg
        if (code === 0) {
          // 领取成功
          this.receiveStatus = 0
        } else if (code === RECEIVE_TYPE.end) {
          // 活动结束
          this.receiveStatus = RECEIVE_TYPE.end
        } else if (code === RECEIVE_TYPE.old) {
          // 老用户
          this.receiveStatus = RECEIVE_TYPE.old
        } else if (code === RECEIVE_TYPE.again) {
          // 已领取
          this.receiveStatus = RECEIVE_TYPE.old
        } else {
          this.$toast(msg)
        }
        this.submiting = false
      },
      onAgain() {
        this.phone = ''
        this.$set(this, 'receiveStatus', RECEIVE_TYPE.default)
      },
      onOpenApp() {
        console.log('onOpenApp');
      },
    },
  }
</script>

<style lang="scss" scoped>
  .pull-new-page {
    height: 100%;
    min-height: 100vh;
    .price-content-wrap {
      // margin-top: 46px;
      padding-bottom: 50px;
      text-align: center;
      background: #ff3b01 url("~assets/imgs/invite/bg_new.png") no-repeat center
        top/100%;
      overflow: hidden;
      .price-content {
        margin: 668px auto 0;
        width: 620px;
        background: #fff;
        border-radius: 20px;
        border: 10px solid #ffa53c;
        box-shadow: 0px 5px 30px red;

        .img-desc {
          width: 346px;
          height: 44px;
        }
        .price-box {
          .img-box {
            width: 199px;
            height: 166px;
          }
        }
        .tip-text {
          margin-top: 80px;
          text-align: center;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          line-height: 40px;
          color: #000;
        }
        .button-activity {
          margin-top: 30px;
          width: 100%;
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
      .default {
        padding: 0 40px 36px;
        .title {
          margin-top: 12px;
          text-align: center;
          font-size: 48px;
          font-family: PingFang SC;
          font-weight: 600;
          line-height: 66px;
          color: rgba(0, 0, 0, 1);
        }
        .price-box {
          margin-top: 28px;
        }
      }
      .success {
        padding: 0 40px 36px;
        .img-success {
          width: 346px;
          height: 110px;
        }
        .price-box {
          margin-top: 16px;
        }
        .success-tip {
          margin-top: 46px;
        }
      }
      .old {
        padding: 0 30px 36px;
        .old-tip {
          margin-top: 80px;
        }
        .price-box {
          margin-top: 72px;
        }
      }
      .end {
        padding: 0 40px 36px;
      }
      .again {
        .price-box {
          margin-top: 72px;
        }
        .again-tip {
          margin-top: 80px;
        }
      }
      .rule-title {
        margin: 30px auto 0;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 500;
        line-height: 44px;
        color: rgba(255, 255, 255, 1);
      }
      .rule-desc {
        padding: 40px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
</style>
