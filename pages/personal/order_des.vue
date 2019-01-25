<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar
        title="订单详情"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <van-icon name="service-o" slot="right"/>
      </van-nav-bar>
    </div>
    <div class="header clearfix">
      <div class="fl">
        <div class="order-unpaid">待支付</div>
        <div class="order-num">订单号:2865682</div>
        <div class="order-time">下单时间：2018-08-23</div>
      </div>
      <div class="fr">
        <div class="order-price">￥408.00</div>
        <div class="order-des">明细</div>
      </div>
    </div>
    <div class="body">
        <div class="tit-card">
            <div class="tit">
                <div class="tit-content">

                </div>
                <div class="tit-arrow">
                    <van-icon></van-icon>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
export default {
  name: "component_name",
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  .header {
    background: #fff;
    padding: 24px 32px;
    .order-unpaid {
      font-size: 32px;
      font-family: PingFang SC;
      line-height: 44px;
      color: rgba(62, 62, 62, 1);
    }
    .order-num {
      font-size: 22px;
      font-family: PingFang SC;
      line-height: 34px;
      color: rgba(57, 158, 246, 1);
    }
    .order-time {
      font-size: 22px;
      font-family: PingFang SC;
      line-height: 34px;
      color: rgba(152, 152, 152, 1);
    }
    .order-price {
      font-size: 32px;
      font-family: PingFang SC;
      line-height: 32px;
      color: rgba(255, 84, 84, 1);
    }
    .order-des {
      font-size: 22px;
      font-family: PingFang SC;
      line-height: 34px;
      color: rgba(251, 96, 93, 1);
      text-align: right;
    }
  }
  .body{
      padding:24px 32px;
      background:#F1F1F1;
      height:100vh;
      .tit-card{
          padding:24px;
          box-sizing: border-box;
          width:686px;
          height:220px;
          border-radius: 8px;
          background:#fff;
      }
  }
}
</style>