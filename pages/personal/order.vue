<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="tab">
      <van-tabs @click="onClick" v-model="active">
        <van-tab v-for="title in orderTile" :key="title.id" :title="title.title" class="layout">
          <loading v-if="firstEnter"></loading>
          <div class="no-data" v-if="!firstEnter && !orderList.length">暂无数据</div>
          <!-- 产品 -->
          <template v-if="orderList.length">
            <div class="prodect" v-for="order in orderList" :key="order.order_id" @click="selectProduct(order)">
              <div class="header clearfix">
                <span class="fl">订单号： {{order.order_id}}</span>
                <i class="fr">产品编号：{{order.product_id}}</i>
              </div>
              <div class="content">
                <div class="pro-pic">
                  <img v-lazy="order.image" alt>
                </div>
                <dl class="pro-content">
                  <dt class="no-wrap-line3">{{order.product_name}}</dt>
                  <dd>出行日期:{{order.product_departure_date.split(' ')[0]}}</dd>
                </dl>
              </div>
              <div class="footer clearfix">
                <div class="fl left-f">
                  <span>共计：</span>
                  <strong>￥{{order.cny_price}}</strong>
                </div>
                <div class="fr right-f">
                  <button :class="getPayClassName(order.status)">{{order.status.name}}</button>
                </div>
              </div>
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import {getOrderInfo} from '@/api/profile'
import Loading from '@/components/loading/list'
export default {
  name: "component_name",
  components: {
    Loading
  },
  data() {
    return {
      status: this.$route.query.status || null,
      active: 0,
      userId: this.$route.query.userId,
      orderList: [],
      firstEnter: true
    }
  },
  created() {
    this.orderTile = [
      {status: '', title: '全部订单', id: 0},
      {status: 'unpaid', title: '待付款', id: 1},
      {status: 'wait', title: '待出行', id: 2},
      {status: 'finish', title: '已出行', id: 3},
    ]
  },
  mounted(){
    let _obj = {
      'null': 0,
      'unpaid': 1,
      'wait': 2,
      'finish':3
    }
    this.active = _obj[this.status]
    this.getOrderData(this.status)
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
    onClick(index) {
      this.firstEnter = true
      let _arr = [null, 'unpaid', 'wait','finish']
      this.getOrderData(this.userId, _arr[index])
    },
    async getOrderData(status) {
      let {code, data} = await getOrderInfo(status)
      if (code === 0) {
        this.firstEnter = false
        this.orderList = data
      }
    },
    getPayClassName(status) {
      let _arr = ['go-pay','un-go','other-state','other-state']
      return _arr[status.code]
    },
    selectProduct(order){
      console.log(order)
      this.$router.push({
        path: '/personal/order_des',
        query: {
          order_id: order.order_id
        }
      })
    }
  },

};
</script>
<style lang="scss" scoped>
.container {
  .tab {
    .layout {
      padding: 24px;
      /*height: 100vh;*/
      .prodect {
        width: 686px;
        height: 342px;
        background: #fff;
        border-radius: 8px;
        margin-bottom: 24px;
        .header {
          height: 72px;
          font: 22px/34px "";
          border-bottom: 1px solid #f1f1f1;
          padding: 0 32px;
          span {
            color: #399ef6;
            font: 22px/72px "";
          }
          i {
            font: 22px/72px "";
            color: #5e5e5e;
          }
        }
        .content {
          font: 24px/32px "";
          padding: 20px 32px;
          border-bottom: 1px solid #f1f1f1;
          display: flex;
          justify-content: space-between;
          .pro-pic {
            margin-right: 26px;
            width: 208px;
            height: 144px;
            background: #ddd;
            img {
              width: 208px !important;
              height: 144px !important;
            }
          }
          .pro-content {
            width: 383px;
            dt {
              text-align: justify;
              font: 24px/30px "";
              color: #191919;
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
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 84px;
              color: rgba(152, 152, 152, 1);
              opacity: 1;
            }
            strong {
              width: 136px;
              height: 44px;
              font-size: 32px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 32px;
              color: rgba(255, 84, 84, 1);
              opacity: 1;
            }
          }
          .right-f {
            .go-pay,.other-state,.un-go {
              width: 120px;
              height: 44px;
              border-radius: 22px;
              font-size: 24px;
              font-weight: 400;
              line-height: 34px;
              color: rgba(255, 255, 255, 1);
              margin-top: 20px;
            }
            .go-pay{
              background: rgba(255, 84, 84, 1);
            }
            .other-state{
              background: rgba(152, 152, 152, 1)
            }
            .un-go{
              background: #399EF6;
            }
          }
        }
      }
    }
    .no-data{
      position: fixed;
      top: 180px;
      left: 0;
      bottom: 0;
      right: 0;
      padding-top: 50px;
      text-align: center;
      color: #aaa;
      font-size: 28px;
      background: #fff;
    }
  }
}
</style>
