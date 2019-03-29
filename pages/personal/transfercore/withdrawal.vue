<template>
  <div class="union-page-container">
    <header-bar title="收益提现"></header-bar>
    <div style="padding-top: 46px">
      <div class="verify-box">
        <h4>提现到支付宝</h4>
        <van-cell is-link @click="playMode = true">
          <template slot="icon">
            <img src="../../../assets/imgs/weixin_pay.png" alt="" width="24">
          </template>
          <template slot="title">
             199 **** 2688
          </template>
        </van-cell>
        <h3>当日12点前申请体现，当日处理。处理12点后申请体现，次日处理。</h3>
        <van-field v-model="money">
          <template slot="label">
            <span class="money">￥</span>
          </template>
        </van-field>
        <p class="note">可体现余额：￥376.05，至少￥50才可提现</p>
      </div>
      <div class="union-btn-submit" @click="submitValidate">提交提现申请</div>
    </div>
    <van-popup
      v-model="playMode"
      position="bottom">
      <h3 class="title">选择提现方式</h3>
      <div class="item-pay" @click="goToNextPath('wx')">
        <img src="../../../assets/imgs/weixin_pay.png" alt="">
        <p>支付宝</p>
      </div>
      <div class="item-pay" @click="goToNextPath('ali')">
        <img src="../../../assets/imgs/alipay.png" alt="">
        <p>微信支付</p>
      </div>
      <div class="union-btn" @click="playMode=false">取消</div>
    </van-popup>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import {getSmsCode, register} from '@/api/sale_union'
export default {
  name: 'withdrawal',
  components: {HeaderBar},
  data(){
    return {
      money: '',
      playMode: false
    }
  },
  methods:{
    submitValidate() {

    },
    goToNextPath(){

    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .verify-box{
    border-radius:12px;
    margin: 15px 15px 0 15px;
    background-color: #fff;
    color: #5B5B5B;
    font-size:20px;
    h4{
      padding: 20px 30px;
      font-size:22px;
      font-weight: normal;
    }
    h3{
      padding: 10px 30px;
      font-size:20px;
      color: #FF7246;
      font-weight: normal;
    }
    .money{
      font-size:40px;
      color: #3B3B3B;
      font-weight: bold;
    }
    p.note{
      padding: 20px 10px 40px 30px;
      color: #D9D9D9;
    }
  }
  h3.title{
    padding: 44px 0;
    text-align: center;
    font-size:32px;
    color: #3E3E3E;
  }
  .item-pay{
    display: flex;
    align-items: center;
    align-items: center;
    padding: 28px 42px;
    border-top: 1px solid #E1E1E1;
    font-size:28px;
    img{
      height: 48px;
      width: 48px;
      margin-right: 24px;
    }
  }
  .union-btn{
    height:100px;
    line-height: 100px;
    background:rgba(244,244,244,1);
    text-align: center;
    color: #989898;
    font-size:32px;
  }
</style>
<style>
  .verify-box .van-field .van-cell__title{
    max-width: 50px;
  }
</style>
