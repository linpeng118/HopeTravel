<template>
  <div class="discount-wrap" :style="{paddingTop: isApp ? '' : '46px'}">
    <header-bar :title="$t('personalPage.exchangeDiscount')" v-if="!isApp"></header-bar>
    <div class="discount-main-box">
      <div class="input-box">
        <van-field v-model="discountCode" :placeholder="$t('personalPage.plhdExchange')" />
        <!-- :disabled="disabledCode"-->
      </div>
      <div class="button-box">
        <van-button type="primary" block @click="bindCoupon" :disabled="discountCode.length !== 8">{{$t('personalPage.immediatelyBind')}}</van-button>
      </div>
      <div class="explain" v-if="language === 'zh-CN'">
        <p><strong>兑换规则</strong></p>
        <p>
          1.本套餐为电子券，不邮寄实体卡， 凭券码进行兑换；</br>
          2.此券码请在有效期内兑换，超期未兑换部分将作废，不予退款；</br>
          3.此券码不兑换现金；</br>
          4.如有疑问可咨询客服，或者电话联系400-118-1388。
        </p>
      </div>
      <div class="explain" v-if="language === 'zh-TW'">
        <p><strong>兌換規則</strong></p>
        <p>
          1.本套餐為電子券，不郵寄實體卡，憑券碼進行兌換；</br>
          2.此券碼請在有效期內兌換，超期未兌換部分將作廢，不予退款；</br>
          3.此券碼不兌換現金；</br>
          4.如有疑問可諮詢客服，或者電話聯繫400-118-1388。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import {bindCouponCode} from  '@/api/profile'
import {mapMutations,mapGetters} from 'vuex'
export default {
  name: 'exchange_discount',
  components: {HeaderBar},
  data(){
    return{
      isApp: this.$route.query.platform,
      appVersion: this.$route.query.app_version,
      appLanguage: this.$route.query.language,
      appCurrency: this.$route.query.currency,
      appPhoneType: this.$route.query.phone_type,
      discountCode: ''
    }
  },
  computed: {
    // disabledCode(){
    //   return this.discountCode.length <= 8 ? false : true
    // },
    ...mapGetters([
      'language'
    ])
  },
  watch:{
    discountCode(newValue,oldValue){
      if(newValue.length >= 9) {
        this.discountCode = oldValue
      }
    }
  },
  async beforeMount() {
    if (this.isApp) {
      this.jsBridge = require("@/assets/js/jsBridge").default;
      this.vxSetPlatform(this.isApp)
      this.vxSetLanguage(this.appLanguage)
      this.vxSetCurrency(this.appCurrency)
      this.vxSetPhoneType(this.appPhoneType)
      this.vxSetAppVersion(this.appVersion)
      console.log(this.appLanguage, this.appCurrency, this.appPhoneType, this.appVersion);
      // 获取到APP的token后请求列表
      await this.jsBridge.webRegisterHandler('obtainUserToken', (token, callback) => {
        if (token) {
          // 设置token
          this.vxChangeTokens(token)
        }
        callback('obtainUserToken success!')
      })
    }
  },
  methods:{
    ...mapMutations({
      // 改变token
      vxChangeTokens: 'setToken',
      // 设置语言
      vxSetLanguage: 'setLanguage',
      // 设置货币
      vxSetCurrency: 'setCurrency',
      // 设置机型
      vxSetPhoneType: "setPhoneType",
      // 设置版本
      vxSetAppVersion: "setAppVersion",
      // 设置平台
      vxSetPlatform: "setPlatform"
    }),
    async bindCoupon(){
      let reg = /^\w{8}$/i
      if(!reg.test(this.discountCode)){
        this.$toast.fail(this.$t('personalPage.discountCodeErro'))
      } else {
        let {code, msg} = await bindCouponCode(this.discountCode)
        if(code === 0) {
          this.$dialog.alert({
            message: msg
          }).then(() => {
            if(this.isApp){
              // 跳转优惠券列表页面
              this.jsBridge.webCallHandler('jumpCouponsListView')
            } else {
              this.$router.push({
                name: 'personal-coupon'
              })
            }
          })
        } else {
          this.$toast.fail(msg)
        }
      }
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
