<template>
  <div class="container">
    <div class="nav-bar">
      <van-nav-bar title="我的订单" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="tab">
      <van-tabs @click="onClick" v-model="active">
        <van-tab title="全部订单" class="layout">
          <!-- 产品 -->
          <div class="prodect">
            <div class="header clearfix">
              <span class="fl">订单号： 286-5682</span>
              <i class="fr">产品编号：1-334</i>
            </div>
            <div class="content clearfix">
              <div class="pro-pic fl">
                <img class="pro-img" src="../../assets/imgs/personal/order/prodect.png" alt>
              </div>
              <dl class="pro-content fl">
                <dt class="no-wrap-line3">旧金山深度游：圣塔芭芭拉拉篮峡谷”丹麦村拉篮啦加州风圣塔芭芭拉拉篮峡谷”丹...</dt>
                <dd>出行日期:2018-08-23</dd>
              </dl>
            </div>
            <div class="footer clearfix">
              <div class="fl left-f">
                <span>共计：</span>
                <strong>￥408.00</strong>
              </div>
              <div class="fr right-f">
                <button class="go-pay">去支付</button>
              </div>
            </div>
          </div>
          <!-- 产品 -->
          <div class="prodect">
            <div class="header clearfix">
              <span class="fl">订单号： 286-5682</span>
              <i class="fr">产品编号：1-334</i>
            </div>
            <div class="content clearfix">
              <div class="pro-pic fl">
                <img class="pro-img" src="../../assets/imgs/personal/order/prodect.png" alt>
              </div>
              <dl class="pro-content fl">
                <dt class="no-wrap-line3">旧金山深度游：圣塔芭芭拉拉篮峡谷”丹麦村拉篮啦加州风圣塔芭芭拉拉篮峡谷”丹...</dt>
                <dd>出行日期:2018-08-23</dd>
              </dl>
            </div>
            <div class="footer clearfix">
              <div class="fl left-f">
                <span>共计：</span>
                <strong>￥408.00</strong>
              </div>
              <div class="fr right-f">
                <button class="other-state">取消</button>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="待付款" class="layout">
          <!-- 产品 -->
          <div class="prodect">
            <div class="header clearfix">
              <span class="fl">订单号： 286-5682</span>
              <i class="fr">产品编号：1-334</i>
            </div>
            <div class="content clearfix">
              <div class="pro-pic fl">
                <img class="pro-img" src="../../assets/imgs/personal/order/prodect.png" alt>
              </div>
              <dl class="pro-content fl">
                <dt class="no-wrap-line3">旧金山深度游：圣塔芭芭拉拉篮峡谷”丹麦村拉篮啦加州风圣塔芭芭拉拉篮峡谷”丹...</dt>
                <dd>出行日期:2018-08-23</dd>
              </dl>
            </div>
            <div class="footer clearfix">
              <div class="fl left-f">
                <span>共计：</span>
                <strong>￥408.00</strong>
              </div>
              <div class="fr right-f">
                <button class="go-pay">去支付</button>
              </div>
            </div>
          </div>
          <!-- 产品 -->
          <div class="prodect">
            <div class="header clearfix">
              <span class="fl">订单号： 286-5682</span>
              <i class="fr">产品编号：1-334</i>
            </div>
            <div class="content clearfix">
              <div class="pro-pic fl">
                <img class="pro-img" src="../../assets/imgs/personal/order/prodect.png" alt>
              </div>
              <dl class="pro-content fl">
                <dt class="no-wrap-line3">旧金山深度游：圣塔芭芭拉拉篮峡谷”丹麦村拉篮啦加州风圣塔芭芭拉拉篮峡谷”丹...</dt>
                <dd>出行日期:2018-08-23</dd>
              </dl>
            </div>
            <div class="footer clearfix">
              <div class="fl left-f">
                <span>共计：</span>
                <strong>￥408.00</strong>
              </div>
              <div class="fr right-f">
                <button class="other-state">取消</button>
              </div>
            </div>
          </div>
          <!-- 产品 -->
          <div class="prodect">
            <div class="header clearfix">
              <span class="fl">订单号： 286-5682</span>
              <i class="fr">产品编号：1-334</i>
            </div>
            <div class="content clearfix">
              <div class="pro-pic fl">
                <img class="pro-img" src="../../assets/imgs/personal/order/prodect.png" alt>
              </div>
              <dl class="pro-content fl">
                <dt class="no-wrap-line3">旧金山深度游：圣塔芭芭拉拉篮峡谷”丹麦村拉篮啦加州风圣塔芭芭拉拉篮峡谷”丹...</dt>
                <dd>出行日期:2018-08-23</dd>
              </dl>
            </div>
            <div class="footer clearfix">
              <div class="fl left-f">
                <span>共计：</span>
                <strong>￥408.00</strong>
              </div>
              <div class="fr right-f">
                <button class="other-state">已作废</button>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="待出行" class="layout">
          <!-- 产品 -->
          <div class="prodect">
            <div class="header clearfix">
              <span class="fl">订单号： 286-5682</span>
              <i class="fr">产品编号：1-334</i>
            </div>
            <div class="content clearfix">
              <div class="pro-pic fl">
                <img class="pro-img" src="../../assets/imgs/personal/order/prodect.png" alt>
              </div>
              <dl class="pro-content fl">
                <dt class="no-wrap-line3">旧金山深度游：圣塔芭芭拉拉篮峡谷”丹麦村拉篮啦加州风圣塔芭芭拉拉篮峡谷”丹...</dt>
                <dd>出行日期:2018-08-23</dd>
              </dl>
            </div>
            <div class="footer clearfix">
              <div class="fl left-f">
                <span>共计：</span>
                <strong>￥408.00</strong>
              </div>
              <div class="fr right-f">
                <button class="go-pay">去支付</button>
              </div>
            </div>
          </div>
          <!-- 产品 -->
          <div class="prodect">
            <div class="header clearfix">
              <span class="fl">订单号： 286-5682</span>
              <i class="fr">产品编号：1-334</i>
            </div>
            <div class="content clearfix">
              <div class="pro-pic fl">
                <img class="pro-img" src="../../assets/imgs/personal/order/prodect.png" alt>
              </div>
              <dl class="pro-content fl">
                <dt class="no-wrap-line3">旧金山深度游：圣塔芭芭拉拉篮峡谷”丹麦村拉篮啦加州风圣塔芭芭拉拉篮峡谷”丹...</dt>
                <dd>出行日期:2018-08-23</dd>
              </dl>
            </div>
            <div class="footer clearfix">
              <div class="fl left-f">
                <span>共计：</span>
                <strong>￥408.00</strong>
              </div>
              <div class="fr right-f">
                <button class="other-state">取消</button>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="已出行" class="layout">
          <!-- 产品 -->
          <div class="prodect">
            <div class="header clearfix">
              <span class="fl">订单号： 286-5682</span>
              <i class="fr">产品编号：1-334</i>
            </div>
            <div class="content clearfix">
              <div class="pro-pic fl">
                <img class="pro-img" src="../../assets/imgs/personal/order/prodect.png" alt>
              </div>
              <dl class="pro-content fl">
                <dt class="no-wrap-line3">旧金山深度游：圣塔芭芭拉拉篮峡谷”丹麦村拉篮啦加州风圣塔芭芭拉拉篮峡谷”丹...</dt>
                <dd>出行日期:2018-08-23</dd>
              </dl>
            </div>
            <div class="footer clearfix">
              <div class="fl left-f">
                <span>共计：</span>
                <strong>￥408.00</strong>
              </div>
              <div class="fr right-f">
                <button class="go-pay">去支付</button>
              </div>
            </div>
          </div>
          <!-- 产品 -->
          <div class="prodect">
            <div class="header clearfix">
              <span class="fl">订单号： 286-5682</span>
              <i class="fr">产品编号：1-334</i>
            </div>
            <div class="content clearfix">
              <div class="pro-pic fl">
                <img class="pro-img" src="../../assets/imgs/personal/order/prodect.png" alt>
              </div>
              <dl class="pro-content fl">
                <dt class="no-wrap-line3">旧金山深度游：圣塔芭芭拉拉篮峡谷”丹麦村拉篮啦加州风圣塔芭芭拉拉篮峡谷”丹...</dt>
                <dd>出行日期:2018-08-23</dd>
              </dl>
            </div>
            <div class="footer clearfix">
              <div class="fl left-f">
                <span>共计：</span>
                <strong>￥408.00</strong>
              </div>
              <div class="fr right-f">
                <button class="other-state">取消</button>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: "component_name",
  data() {
    return {
        active:0,//tab切换的默认值和选中值
    };
  },
  created(){
      
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    },
    onClick(index, title) {
      this.$toast(title);
    }
  },
  
};
</script>
<style lang="scss" scoped>
.container {
  .tab {
    .layout {
      padding: 24px;
      height: 100vh;
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
          box-sizing: border-box;
          border-bottom: 1px solid #f1f1f1;
          .pro-pic {
            margin-right: 26px;
            .pro-img {
              width: 208px;
              height: 144px;
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
            .go-pay {
              width: 120px;
              height: 44px;
              background: rgba(255, 84, 84, 1);
              opacity: 1;
              border-radius: 22px;
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 34px;
              color: rgba(255, 255, 255, 1);
            }
            .other-state {
              width: 120px;
              height: 44px;
              background: rgba(152, 152, 152, 1);
              border-radius: 22px;
              font-size: 24px;
              font-family: PingFang SC;
              font-weight: 400;
              line-height: 34px;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
    }
  }
}
</style>