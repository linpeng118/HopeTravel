<template>
  <div class="product-order-item">
    <div class="header clearfix">
      <span class="fl">{{$t('personalPage.orderNumber')}}： {{orderInfo.order_id}}</span>
      <span class="fr">{{$t('productDetailPage.productId')}}：{{orderInfo.product_id}}</span>
    </div>
    <div class="content">
      <div class="pro-pic">
        <img :src="orderInfo.image"
          alt>
      </div>
      <dl class="pro-content">
        <!-- 产品名 -->
        <dt class="product-title title-wrap-line3">
          <span class="short-name">{{orderInfo.name_short}}</span>
          <div class="text">{{orderInfo.product_name}}</div>
        </dt>
        <!-- 价格 -->
        <dt class="price">
          <span>{{$t('personalPage.totalPrice')}}：</span>
          <strong>￥{{orderInfo.cny_price}}</strong>
        </dt>
        <!-- 日期 -->
        <dt class="travel-date">
          <span>{{$t('personalPage.travelDate')}}:</span>
          <span>{{orderInfo.product_departure_date.split(' ')[0]}}</span>
        </dt>
        <!-- 按钮 code:0 为出行；code:2 -->
        <button class="btn-status go-pay"
          v-if="orderInfo.status.code===0"
          @click.stop="btnPay">{{orderInfo.status.name}}</button>
        <button class="btn-grey"
          v-else-if="orderInfo.status.code===1">{{orderInfo.status.name}}</button>
        <button class="btn-grey"
          v-else>已出行</button>
      </dl>
    </div>
    <!-- 去支付 -->
    <form style="display: none"
      :action="`${apiPath.payment}/payment/mobile/checkout`"
      method="post">
      <input type="text"
        name="order_id"
        value=""
        ref="orderId">
      <input type="text"
        name="order_title"
        value=""
        ref="orderTitle">
      <input type="text"
        name="total_fee[CNY]"
        value=""
        ref="totalFeeCNY">
      <input type="text"
        name="total_fee[USD]"
        value=""
        ref="totalFeeUSD">
      <input type="text"
        name="client_type"
        value="tourscool">
      <input type="text"
        name="jwt"
        value=""
        ref="jwt"
        readonly="">
      <input type="text"
        name="success_url"
        ref="successUrl">
      <input type="text"
        name="failure_url"
        ref="failureUrl">
      <input type="submit"
        ref="submitform">
    </form>
  </div>
</template>

<script>
  import {
    getTokenByOrderId
  } from '@/api/order'
  import {getSessionStore} from '@/assets/js/utils'

  export default {
    components: {},
    props: {
      orderInfo: {
        type: Object
      },
      authCode: {
        type: String
      }
    },
    data() {
      return {
        apiPath: require('@/apiConf.env'),
      }
    },
    methods: {
      // 去支付（先兑换token）
      async btnPay() {
        const {code, msg, data} = await getTokenByOrderId({
          auth_code: this.authCode,
          order_id: this.orderInfo.order_id,
        })
        if (code === 0) {
          // 构造数据
          let subData = {
            token: data.token,
            ...this.orderInfo
          }
          this.subData(subData)
        } else {
          console.Error(msg)
        }
      },
      // 支付跳转
      subData(val) {
        console.log(val);
        // 跳转链接
        let successUrl = `//${window.location.host}/order/search/detail?order_id=${val.order_id}`;
        let failureUrl = `//${window.location.host}/order/search/detail?order_id=${val.order_id}`;
        // token处理
        // token = token.replace('Bearer ', '');
        // 表单
        this.$refs.orderId.value = val.order_id;
        this.$refs.orderTitle.value = val.product_name;
        this.$refs.totalFeeCNY.value = Number(val.cny_price) * 100 || 0;
        this.$refs.totalFeeUSD.value = Number(val.usd_price) * 100 || 0;
        this.$refs.jwt.value = val.token;
        this.$refs.successUrl.value = successUrl
        this.$refs.failureUrl.value = failureUrl
        this.$refs.submitform.click();
      },
    },
  }
</script>

<style lang="scss" scoped>
  .product-order-item {
    border-radius: 8px;
    background: rgba(255, 255, 255, 1);
    .header {
      height: 72px;
      font: 22px/34px "";
      border-bottom: 1px solid #f1f1f1;
      padding: 0 32px;

      span {
        color: rgba(191, 191, 191, 1);
        font: 22px/72px "";
      }
    }

    .content {
      font: 24px/32px "";
      padding: 20px 24px 44px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;
      // border-bottom: 1px solid #f1f1f1;

      .pro-pic {
        width: 222px;
        height: 222px;
        background: #ddd;
        border-radius: 12px;

        img {
          width: 100% !important;
          height: 100% !important;
        }
      }

      .pro-content {
        width: 390px;
        position: relative;
        margin-left: 26px;
        .product-title {
          text-align: justify;
          font-size: 0;
          color: #191919;

          &.title-wrap-line3 {
            /*position: relative;*/
            line-height: 30px;
            height: 130px;
            overflow: hidden;
            box-sizing: content-box;
            .short-name{
              font-size:32px;
              font-weight:bold;
              line-height:44px;
              color:rgba(45,45,45,1);
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
            .text {
              overflow: hidden;
              box-sizing: content-box;
              font-size:28px;
              font-weight:400;
              line-height:40px;
              color:rgba(45,45,45,1);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        .price {
          margin-top: 6px;
          span {
            width: 60px;
            font-size: 20px;
            font-weight: 400;
            color: rgba(152, 152, 152, 1);
            opacity: 1;
          }
          strong {
            width: 136px;
            font-size: 32px;
            font-weight: 400;
            line-height: 32px;
            color: rgba(255, 84, 84, 1);
            opacity: 1;
          }
        }
        .travel-date {
          margin-top: 12px;
          span {
            color: #989898;
            font-size: 16px;
          }
        }
        .btn-status {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 120px;
          height: 44px;
          border-radius: 22px;
          font-size: 24px;
          font-weight: 400;
          line-height: 34px;
          color: rgba(255, 255, 255, 1);
          margin-top: 20px;
        }
        .btn-grey {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 120px;
          height: 44px;
          border-radius: 22px;
          font-size: 24px;
          font-weight: 400;
          line-height: 34px;
          color: rgba(152, 152, 152, 1);
          background: #fff;
          margin-top: 20px;
        }
        .go-pay {
          background: rgba(255, 84, 84, 1);
        }
      }
    }
  }
</style>