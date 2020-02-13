<template>
  <div>
    <van-nav-bar :title="$t('validatePhone')" left-arrow @click-left="onClickLeft" class="header"/>
    <div class="phone-vali">
      <area-code :proAreaCode.sync="phoneForm.areaCode"
                 :proMobile.sync="phoneForm.phone"
                 className="no-border"
      ></area-code>
      <van-field v-model="phoneForm.smsCode" :placeholder="$t('plhdSMS')">
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="getCode"
          class="send-btn"
          :disabled="codeType===VERIFY_CODE.GETTING"
        >{{showText}}</van-button>
      </van-field>
      <div class="btn_container" @click="validateCode">
        <button class="sure">{{$t('verify')}}</button>
      </div>
    </div>
  </div>

</template>
<script>
import AreaCode from '@/components/input/areaCode'
import {LOGIN_TYPE, VERIFY_CODE, SMS_SCENE} from '@/assets/js/consts'
import {getSmsCode, validatePhone} from '@/api/member'
const TIME = 60 // 倒计时时间
export default {
  name: 'component_phone',
  components:{AreaCode},
  data() {
    return {
      VERIFY_CODE,
      phoneForm: {
        areaCode: '86', // 区号
        phone: '',
        smsCode: '', // 短信验证码
      },
      codeType: VERIFY_CODE.START, // 获取验证码/倒计时/重新获取
      timer: null, // 定时器
      countDownTime: TIME, // 倒计时时间
    };
  },
  computed: {
    showText() {
      if (this.codeType === VERIFY_CODE.START) {
        clearInterval(this.timer)
        return this.$t('getVerifyCode')
      } else if (this.codeType === VERIFY_CODE.GETTING) {
        return `${this.countDownTime} s`
      } else {
        clearInterval(this.timer)
        return this.$t('accountComp.getVerifyCodeAgain')
      }
    }
  },
  methods: {
    onClickLeft() {
      this.$emit('closeNameLayer')
    },
    // 获取验证码
    async getCode() {
      if (!this.phoneForm.phone) {
        this.$toast(this.$t('accountComp.plhdPhoneNumber'))
        return
      }
      // 倒计时状态修改
      this.codeType = VERIFY_CODE.GETTING // 获取验证码
      let {code,msg} = await getSmsCode({
        phone: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`,
        scene: SMS_SCENE.VALIDATE
      })
      if (code === 0) {
        await this.countDown()
      } else {
        this.$toast(msg + '，' + this.$t('accountComp.checkPhoneNumber'))
        this.codeType = VERIFY_CODE.START
      }
    },
    countDown() {
      this.timer = setInterval(() => {
        // console.log(this.countDownTime)
        if (this.countDownTime <= 0) {
          this.codeType = VERIFY_CODE.AGAIN
          this.countDownTime = TIME
          // console.log('countDownTime', this.countDownTime)
          clearInterval(this.timer)
        } else {
          this.countDownTime--
        }
      }, 1000)
    },
    // 修改手机号
    async validateCode() {
      let {code,msg} = await validatePhone({
        code: this.phoneForm.smsCode,
        phone: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`
      })
      if (code === 0) {
        this.$emit('validatePhone', this.phoneForm.phone)
      } else {
        this.$toast(msg)
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .header{
    border-bottom: 1px solid #dedede;
  }
  .btn_container {
    margin-top:50px;
    text-align: center;
    .sure {
      width: 596px;
      height: 84px;
      background: rgba(57, 158, 246, 1);
      opacity: 1;
      border-radius: 10px;
      color:#fff;
      font:36px/84px "";
    }
  }
  .phone-vali{
    padding: 0 32px;
    .no-border{
      border: none !important;
    }
    .send-btn{
      background: #fff;
      border: #399EF6 2px solid;
      color: #399EF6;
      border-radius:28px;
      padding: 0 28px;
    }
  }

</style>
