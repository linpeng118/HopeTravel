<template>
  <div class="pull-new-page">
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
      <van-button class="button-activity"
        :disabled="submiting"
        @click="onReceive"
        type="default">立刻领取</van-button>
    </div>
    <!-- 领取成功 -->
    <div class="price-content success"
      v-if="receiveStatus===0">
      <img class="img-success mt-20"
        src="~/assets/imgs/invite/reveive@2x.png"
        alt="">
      <!-- 优惠券列表 -->
      <template v-for="(invite, index) in inviteLists">
        <div class="coupon-list"
          :key="invite.rule_coupon_id">
          <coupon-comp :item="invite"
            @showAll="showExplain"
            :typeOne="index == 1"
            :index="index"></coupon-comp>
        </div>
      </template>
      <van-button class="button-activity mt-26"
        @click="onOpenApp"
        type="default">去使用</van-button>
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
    <h1 class="exclusive-title">新人专享</h1>
    <!-- 热门城市 -->
    <div class="hot-city-list">
      <template v-for="(product, index) in products">
        <div class="city-item"
          :key="product.title"
          @click="onCity(index)">{{product.title}}</div>
      </template>
    </div>
    <!-- 推荐产品 -->
    <section class="product-list"
      v-if="products[activeCity]&&products[activeCity].items">
      <template v-for="item in products[activeCity].items">
        <div class="product"
          :key="item.product_id">
          <div class="banner"
            :style="{'background': `#eee url(${item.image}) no-repeat center/100%`}">
            <span class="discount">{{item.coupon}}</span>
          </div>
          <div class="more">
            <p class="name no-wrap-line3">{{item.name}}</p>
            <p class="price">
              <span class="p-old">{{item.default_price}}</span>
              <span class="p-now">{{item.default_price}}</span>
              <span class="text">起</span>
            </p>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {getPullNewRules, getProducts, getCouponsReceive} from '@/api/activity'
  import {RECEIVE_TYPE} from '@/assets/js/consts/activity'
  import {CouponComp} from '@/components/coupons'

  export default {
    components: {
      CouponComp
    },
    data() {
      return {
        RECEIVE_TYPE,
        // 是否是app
        isApp: this.$route.query.platform,
        // 活动id
        id: '',
        // 活动规则
        rules: '',
        // 推荐列表
        products: [],
        activeCity: 0,
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
    beforeMount() {
      this.appBridge = require('@/assets/js/appBridge.js').default
    },
    mounted() {
      this.init()
    },
    methods: {
      ...mapMutations({
        vxChangeTokens: 'setToken',
      }),
      async init() {
        await this.getRules()
        await this.getProductList()
        await this.getTokenFromApp()
      },
      // 活动信息
      async getRules() {
        const {code, msg, data} = await getPullNewRules({
          type: 'reduction'
        })
        if (code === 0) {
          this.id = data.id
        }
      },
      /**
       * 获取推荐产品列表,page_size默认20条
       */
      async getProductList() {
        const {code, msg, data} = await getProducts({
          pageSize: 20,
        })
        if (code === 0) {
          this.products = data
        }
      },
      // 获取token
      async getTokenFromApp() {
        try {
          let token = await this.appBridge.obtainUserToken()
          // 设置token
          this.vxChangeTokens(token)
        } catch (error) {
          console.log(error)
        }
      },
      // 点击领取
      async onReceive() {
        this.submiting = true
        console.log('onReceive', `${this.areaCode}-${this.phone}`)
        const {code, msg, data} = await getCouponsReceive({
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
      onCity(city) {
        this.activeCity = city
      },
      // 重新领取
      onAgain() {
        this.phone = ''
        this.$set(this, 'receiveStatus', RECEIVE_TYPE.default)
      },
      // 打开APP
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
    text-align: center;
    background: #fff url("~assets/imgs/invite/bg_new.png") no-repeat center
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
        height: 40px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 40px;
        color: #000;
      }
      .button-activity {
        margin-top: 72px;
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
        margin-top: 36px;
      }
    }
    .success {
      padding: 0 40px 36px;
      .img-success {
        width: 346px;
        height: 110px;
      }
      .coupon-list {
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
    .exclusive-title {
      position: relative;
      margin: 60px auto 0;
      width: 200px;
      font-size: 44px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff;
      &:before,
      &:after {
        display: block;
        content: "";
        position: absolute;
        top: 30px;
        width: 108px;
        height: 2px;
        background: #fff;
      }
      &:before {
        left: -150px;
      }
      &:after {
        right: -150px;
      }
    }
    // 热门城市
    .hot-city-list {
      margin: 22px 0;
      text-align: center;
      .city-item {
        margin: 0 16px;
        padding: 0px 20px;
        display: inline-block;
        font-size: 18px;
        line-height: 36px;
        color: #fff;
        background: linear-gradient(
          90deg,
          rgba(253, 179, 0, 1) 0%,
          rgba(253, 165, 0, 1) 100%
        );
        border-radius: 22px;
      }
    }
    .product-list {
      overflow: hidden;
      padding-top: 40px;
      .product {
        display: inline-block;
        margin: 20px 20px 0;
        width: 278px;
        .banner {
          position: relative;
          height: 210px;
          width: 278px;
          .discount {
            position: absolute;
            left: 0;
            top: 0;
            width: 146px;
            height: 46px;
            line-height: 46px;
            background: #000;
            opacity: 0.51;
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 600;
            color: #fff;
          }
        }
        .more {
          padding: 12px 20px;
          .name {
            width: 240px;
            font-size: 20px;
            font-family: PingFang SC;
            font-weight: 400;
            line-height: 28px;
            color: #000;
          }
          .price {
            .p-old,
            .text {
              height: 28px;
              font-size: 20px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 28px;
              color: rgba(198, 198, 198, 1);
              opacity: 1;
            }
            .p-old {
              text-decoration: line-through;
            }
            .p-now {
              height: 48px;
              font-size: 34px;
              font-family: PingFang SC;
              font-weight: 600;
              line-height: 48px;
              color: rgba(255, 0, 0, 1);
            }
          }
        }
      }
    }
  }
</style>
