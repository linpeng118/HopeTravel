<template>
  <div>
    <van-nav-bar :title="$t('accountComp.emailTitle')" left-arrow @click-left="onClickLeft" class="header"/>
    <van-field v-model="email" :placeholder="$t('accountComp.plhdEmail')"></van-field>
    <van-field v-model="emailCode" :placeholder="$t('enterEmailCode')">
      <van-button
        slot="button"
        size="small"
        type="primary"
        @click="getCode"
        class="send-btn"
        :disabled="codeType===VERIFY_CODE.GETTING"
      >{{showText}}</van-button>
    </van-field>
    <div class="btn_container" @click="bindEmail">
      <button class="sure">{{$t('verify')}}</button>
    </div>
  </div>
</template>
<script>
  import {validateEmail, captchaEmail} from '@/api/member'
  import {VERIFY_CODE} from '@/assets/js/consts'
  import {isEmail} from '@/assets/js/utils'
  const TIME = 120 // 倒计时时间
  export default {
    name: 'component_emil',
    data () {
      return {
        VERIFY_CODE,
        email: "",//邮箱地址
        emailCode:"",//邮箱验证码
        timer: null, // 定时器
        countDownTime: TIME, // 倒计时时间
        codeType: VERIFY_CODE.START, // 获取验证码/倒计时/重新获取
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
      async getCode() {
        if(isEmail(this.email)) {
          // 倒计时状态修改
          this.codeType = VERIFY_CODE.GETTING // 获取验证码
          const _email = this.email.toLocaleLowerCase()
          let {code,msg} = await captchaEmail(_email)
          if(code === 0) {
            await this.countDown()
            this.$toast(msg)
          } else {
            this.$toast(msg)
            this.codeType = VERIFY_CODE.START
          }
        } else {
          this.$toast(this.$t('accountComp.emailErrorTosat'))
        }
      },
      async bindEmail() {
        const _email = this.email.toLocaleLowerCase()
        let {code, msg} = await validateEmail({
          email: _email,
          code: this.emailCode
        })
        if (code === 0) {
          setTimeout(() => {
            this.$toast(msg)
            this.$emit('sendEmail', this.email)
          }, 1000)
        } else {
          this.$toast(msg)
        }
      },
      countDown() {
        // console.log('zhixing')
        this.timer = setInterval(() => {
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
    }
  }
</script>
<style lang="scss" scoped>
  .header{
    border-bottom: 1px solid #dedede;
  }
  .btn{
    border-radius:8px;
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
</style>
