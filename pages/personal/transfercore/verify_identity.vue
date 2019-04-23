<template>
  <div class="union-page-container">
    <header-bar title="首次提现"></header-bar>
    <div style="padding-top: 46px">
      <div class="verify-box">
        <h2>为了你的账户安全，首次体现需要验证您的身份信息！</h2>
        <van-cell-group>
          <van-field
            v-model="fillInfo.userName"
            placeholder="填写姓名"
            label="姓名"
          />
          <van-field
            v-model="fillInfo.cardId"
            placeholder="填写身份证号"
            label="身份证号"
          />
        </van-cell-group>
      </div>
      <div class="verify-box">
        <van-cell-group>
          <van-field
            v-if="profile.phone"
            :value="profile.phone | hidePhone"
            disabled
            placeholder="填写电话号码"
            label="电话号码"
          />
          <van-field v-else
            v-model="fillInfo.phone"
            placeholder="填写电话号码"
            label="电话号码"
          />
          <van-field
            v-model="fillInfo.smsCode"
            center
            clearable
            label="验证码"
            placeholder="填写验证码"
          >
            <van-button slot="button" plain size="small" @click="getCode">{{getShowText}}</van-button>
          </van-field>
        </van-cell-group>
      </div>
      <div class="union-btn-submit" @click="submitValidate">
        完成
      </div>
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
import {isCard,isMobile} from '@/assets/js/utils'
import {setPayIDCard} from '@/api/sale_union'
import {payInfo} from '@/assets/js/mixins/getPayInfo'
import {isAgent} from '@/assets/js/mixins/isAgent'
const TIME = 60 // 倒计时时间
export default {
  name: 'verify_identity',
  components: {HeaderBar},
  filters: {
    hidePhone(tel){
      return tel.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
    }
  },
  mixins:[payInfo,isAgent],
  data(){
    return {
      value: '',
      countDownTime: TIME, // 倒计时时间
      codeType: 0, // 0开始, 1获取ing, 2重新获取
      playMode: false, // 付款方式选择
    }
  },
  computed:{
    getShowText() {
      if (this.codeType === 0) {
        clearInterval(this.timer)
        return '获取验证码'
      } else if (this.codeType === 1) {
        return `${this.countDownTime} s`
      } else {
        clearInterval(this.timer)
        return '重新获取'
      }
    },
  },
  mounted() {
    this.fillInfo = {
      userName: this.payInfo.chinese_name || '',
      cardId: this.payInfo.idcard_no || '',
      smsCode: 'validate',
    }
  },
  methods: {
    // 获取验证码
    async getCode() {
      // 倒计时状态修改
      this.codeType = 1 // 正在请求数据
      try {
        const {code, msg} = await getSmsCode({
          phone: this.profile.phone
        })
        if (code !== 0) {
          this.$toast(msg)
        }
        await this.countDown()
      } catch (error) {
        this.codeType = 1
      }
    },
    countDown() {
      this.timer = setInterval(() => {
        // console.log(this.countDownTime)
        if (this.countDownTime <= 0) {
          this.codeType = 0
          this.countDownTime = TIME
          clearInterval(this.timer)
        } else {
          this.countDownTime--
        }
      }, 1000)
    },
    async submitValidate() {
      if(this.payInfo.idcard_no) {
        this.playMode = true
      } else {
        var regName =/^[\u4e00-\u9fa5]{2,4}$/
        let {userName, cardId, phone, smsCode} = this.fillInfo
        if(!regName.test(userName)) {
          this.$toast('姓名填写错误')
          return false
        }
        if(!isCard(cardId)) {
          this.$toast('身份证填写有误')
          return false
        }
        if(!this.profile.phone) {
          if(!isMobile(phone)){
            this.$toast('手机号码填写有误')
            return false
          }
        }
        if(!smsCode) {
          this.$toast('验证码不能为空')
          return false
        }
        let param = {
          userName,cardId,smsCode,
          phone: this.profile.phone || phone
        }
        let {code,msg} = await setPayIDCard(param)
        if(code === 0) {
          this.$toast.success('添加成功')
          setTimeout(() => {
            this.playMode = true
          }, 3000)
        } else {
          this.$toast.fail(msg)
        }
      }
    },
    goToNextPath(value){
      // 进来了吗
      this.$router.push({
        name:'personal-transfercore-account_sure',
        query: {
          type: value
        }
      })
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .verify-box{
    border-radius:12px;
    margin: 15px 15px 0 15px;
    background-color: #fff;
    h2{
      padding: 20px 30px;
      font-size:20px;
      color: #FF7246;
      font-weight: normal;
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
