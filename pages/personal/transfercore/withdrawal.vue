<template>
  <div class="union-page-container">
    <header-bar title="收益提现" :controlJump="true" @leftJump="onClickLeft"></header-bar>
    <div style="padding-top: 46px">
      <div class="verify-box">
        <h4>提现到{{type}}</h4>
        <van-cell is-link @click="playMode = true">
          <template slot="icon">
            <img src="../../../assets/imgs/weixin_pay.png" v-if="$route.query.type === 'weixin'" alt="" width="24">
            <img src="../../../assets/imgs/alipay.png" v-else alt="" width="24">
          </template>
          <template slot="title">
            <span style="margin-left: 10px;" v-if="$route.query.type === 'weixin'">{{payInfo.weixin_no}}</span>
            <span style="margin-left: 10px;" v-else>{{payInfo.alipay_no}}</span>
          </template>
        </van-cell>
        <h3>当日12点前申请提现，当日处理。处理12点后申请提现，次日处理。</h3>
        <van-field v-model="money" type="number" class="money-input" :disabled="payInfo.agent_balance < payInfo.min_amount ? true: false">
          <template slot="label">
            <span class="money">￥</span>
          </template>
        </van-field>
        <p class="note">可体现余额：￥{{payInfo.agent_balance}}，至少￥{{payInfo.min_amount}}才可提现</p>
      </div>
      <div class="union-btn-submit" @click="submitValidate" v-if="payInfo.agent_balance > payInfo.min_amount">提交提现申请</div>
      <div class="union-btn-disable" v-else>提交提现申请</div>
    </div>

    <van-popup
      v-model="playMode"
      position="bottom">
      <h3 class="title">选择提现方式</h3>
      <div class="item-pay" @click="goToNextPath('weixin')">
        <img src="../../../assets/imgs/weixin_pay.png" alt="">
        <p>微信支付</p>
      </div>
      <div class="item-pay" @click="goToNextPath('alipay')">
        <img src="../../../assets/imgs/alipay.png" alt="">
        <p>支付宝</p>
      </div>
      <div class="union-btn" @click="playMode=false">取消</div>
    </van-popup>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import {getSmsCode, register} from '@/api/sale_union'
import {payInfo} from '@/assets/js/mixins/getPayInfo'
import {startWithdraw, getPayInfo} from '@/api/sale_union'
import {mapMutations} from 'vuex'
export default {
  name: 'withdrawal',
  components: {HeaderBar},
  mixins:[payInfo],
  data(){
    return {
      money: '',
      playMode: false,
      type: this.$route.query.type === 'weixin' ? '微信' : '支付宝'
    }
  },
  methods:{
    onClickLeft(){
      this.$router.push({
        name: 'personal-transfercore'
      })
    },
    async submitValidate() {
      if(Number(this.money) > Number(this.payInfo.agent_balance)) {
        this.$toast.fail('金额太大了')
        return false
      }
      if(Number(this.money) < Number(this.payInfo.min_amount)) {
        this.$toast.fail('金额太小了')
        return false
      }
      let {code, msg} = await startWithdraw({
        type: this.$route.query.type,
        account_no: this.$route.query.type === 'weixin' ? this.payInfo.weixin_no : this.payInfo.alipay_no,
        amount: this.money
      })
      if(code === 0) {
        this.$toast.success('提交成功')
        this.getPayDetail()
        setTimeout(() => {
          this.$router.push({
            name: 'personal-transfercore'
          })
        }, 3000)
      } else {
        this.$toast.fail(msg)
      }
    },
    goToNextPath(value){
      this.$router.push({
        name:'personal-transfercore-account_sure',
        query: {
          type: value,
          again: true
        }
      })
    },
    async getPayDetail() {
      let {code,data} = await getPayInfo()
      let _obj = {}
      if(code === 0) {
        _obj= data
      }
      this.vxSetPayInfo(_obj)
    },
    ...mapMutations({
      vxSetPayInfo: 'saleUnion/setPayInfo'
    })
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
  .verify-box .van-field.money-input .van-cell__title{
    max-width: 50px;
  }
</style>
