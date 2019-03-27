<template>
  <div class="profit-wrap">
    <div class="desc-w">
      <div class="name">
        <p class="title">{{item.product_name}}</p>
        <p>订单金额：{{item.price}}</p>
      </div>
      <div class="price-box">
        <p class="get-p">+{{item.order_fee}}</p>
        <p class="status" :class="item.status !== 1 ? 'color': ''">
          {{item.status_name}}
        </p>
      </div>
    </div>
    <div class="btm-area">{{item.created}} 直接收益</div>
  </div>
</template>

<script>
export default {
  name: 'countList',
  props: {
    item: {
      type: Object,
      default: null
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .profit-wrap{
    height:160px;
    box-shadow:0px 4px 4px rgba(217,217,217,0.14);
    border-radius:12px;
    background-color: #fff;
    font-size: 20px;
    color: #9B9B9B;
    margin: 20px 16px 0 16px;
    .desc-w{
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .name{
        flex: 1;
        overflow: hidden;
      }
      .title{
        height: 40px;
        line-height: 40px;
        color: #5B5B5B;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        font-size:24px;
      }
      .price-box{
        width: 180px;
        text-align: right;
      }
      .get-p{
        height: 40px;
        line-height: 40px;
        font-size:32px;
        color: #3B3B3B;
        font-weight:bold;
      }
      .color{
        color: #FF7246;
      }
      .color1{
        color: #DB302C;
      }
    }
    .btm-area{
      height: 54px;
      line-height: 54px;
      border-top: 2px dashed #E1E1E1;
      padding:0 20px;
    }
  }
</style>
