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
        <!--<dt class="no-wrap-line3">{{orderInfo.product_name}}</dt>-->
        <dt class="title-wrap-line3">
          <div class="text">{{orderInfo.product_name}}</div>
        </dt>
        <dd>{{$t('personalPage.travelDate')}}:{{orderInfo.product_departure_date.split(' ')[0]}}</dd>
      </dl>
    </div>
    <div class="footer clearfix">
      <div class="fl left-f">
        <span>{{$t('personalPage.totalPrice')}}：</span>
        <strong>￥{{orderInfo.cny_price}}</strong>
      </div>
      <!-- <div class="fr right-f">
        <span class="tip"
          v-if="orderInfo.status.code==2 && orderInfo.product_comment_status==0">评价最高送500米粒</span>
        <button :class="getPayClassName(orderInfo.status)"
          v-if="orderInfo.status.code!=2">{{orderInfo.status.name}}</button>
        <button class="un-go"
          v-if="orderInfo.status.code==2 && orderInfo.product_comment_status==0"
          @click.stop="linkToCreate(orderInfo)">去评价</button>
        <button class="un-go"
          v-if="orderInfo.status.code==2 && orderInfo.product_comment_status==900003"
          @click.stop="linkToCreate(orderInfo)">去追评</button>
        <button class="other-state"
          v-if="orderInfo.status.code==2 && orderInfo.product_comment_status==900004">已评价</button>
      </div> -->
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      orderInfo: {
        type: Object
      }
    },
    data() {
      return {
      }
    },
    computed: {},
    mounted() {},
    methods: {
      getPayClassName(status) {
        let _arr = ['go-pay', 'un-go', 'other-state', 'other-state']
        return status ? _arr[status.code] : 0
      },
    },
  }
</script>

<style lang="scss" scoped>
  .product-order-item {
    padding: 0 24px;
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
      padding: 20px 32px;
      border-bottom: 1px solid #f1f1f1;
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
      -webkit-justify-content: space-between;

      .pro-pic {
        margin-right: 26px;
        width: 182px;
        height: 182px;
        background: #ddd;
        border-radius: 12px;

        img {
          width: 182px !important;
          height: 182px !important;
        }
      }

      .pro-content {
        width: 383px;

        dt {
          text-align: justify;
          font-size: 24px;
          color: #191919;

          &.title-wrap-line3 {
            /*position: relative;*/
            line-height: 30px;
            height: 90px;
            overflow: hidden;
            box-sizing: content-box;

            .text {
              float: right;
              margin-left: -5px;
              width: 100%;
              word-break: break-all;
              box-sizing: content-box;
              font-size: 32px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 44px;
              color: rgba(0, 0, 0, 1);
            }

            &::before {
              float: left;
              width: 5px;
              content: "";
              height: 90px;
            }

            &::after {
              float: right;
              content: "...";
              height: 30px;
              line-height: 30px;
              /* 为三个省略号的宽度 */
              width: 30px;
              /* 使盒子不占位置 */
              margin-left: -30px;
              /* 移动省略号位置 */
              position: relative;
              left: 100%;
              top: -30px;
              padding-right: 1px;
              background-color: #fff;
            }
          }
        }

        dd {
          color: #989898;
          font: 24px/24px "";
          margin-top: 20px;
        }
      }
    }

    .footer {
      padding: 0 32px;
      height: 84px;

      .left-f {
        span {
          width: 60px;
          height: 28px;
          font-size: 20px;
          font-weight: 400;
          line-height: 84px;
          color: rgba(152, 152, 152, 1);
          opacity: 1;
        }

        strong {
          width: 136px;
          height: 44px;
          font-size: 32px;
          font-weight: 400;
          line-height: 32px;
          color: rgba(255, 84, 84, 1);
          opacity: 1;
        }
      }

      .right-f {
        .go-pay,
        .other-state,
        .un-go {
          width: 120px;
          height: 44px;
          border-radius: 22px;
          font-size: 24px;
          font-weight: 400;
          line-height: 34px;
          color: rgba(255, 255, 255, 1);
          margin-top: 20px;
        }

        .go-pay {
          background: rgba(255, 84, 84, 1);
        }

        .other-state {
          background: rgba(152, 152, 152, 1);
        }

        .un-go {
          background: #399ef6;
        }

        .tip {
          font-size: 16px;
          color: #ff5454;
        }
      }
    }
    /*height: 100vh;*/
    .prodect {
      width: 686px;
      height: 342px;
      background: #fff;
      border-radius: 8px;
      margin-bottom: 24px;
      padding-bottom: 20px;
    }
  }
</style>