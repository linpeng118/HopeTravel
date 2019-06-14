<template>
  <div class="discount-wrap" :style="{paddingTop: isApp ? '' : '46px'}">
    <header-bar title="兑换优惠码" v-if="!isApp"></header-bar>
    <div class="discount-main-box">
      <div class="input-box">
        <van-field v-model="discountCode" placeholder="请输入优惠码" />
      </div>
      <div class="button-box">
        <van-button type="primary" block>立即绑定</van-button>
      </div>
      <div class="explain">
        <p><strong>兑换规则</strong></p>
        <p>
          1.本套餐为电子券，不邮寄实体卡， 凭券码进行兑换；</br>
          2.此券码请在有效期内兑换，超期未兑换部分将作废，不予退款；</br>
          3.此券码不兑换现金；</br>
          4.如有疑问可咨询客服，或者电话联系400-118-1388。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
export default {
  name: 'exchange_discount',
  components: {HeaderBar},
  data(){
    return{
      isApp: this.$route.query.platform,
      discountCode: ''
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .discount-wrap{
    width: 100vw;
    height: 100vh;
    background: #F5F4F9;
    .discount-main-box{
      padding: 32px;
      .input-box{
        height:128px;
        background-color: #fff;
        box-shadow:0px 0px 12px rgba(0,0,0,0.1);
        border-radius:8px;
        padding: 30px;
        .van-field{
          background-color: #F1F1F1 !important;
          border-radius:12px;
          padding-top: 11px;
          padding-bottom: 11px
        }
      }
      .button-box{
        margin-top: 30px;
        padding: 0 110px;
        button{
          background-color: #399EF6;
          border-color: #399EF6;
        }
      }
      .explain{
        font-size: 24px;
        color: #666;
        line-height: 60px;
        padding: 140px 24px 0 24px;
        strong{
          color: #3E3E3E;
        }
      }
    }
  }
</style>
<style>
  .discount-main-box .van-field__control{
    text-align: center;
  }
</style>
