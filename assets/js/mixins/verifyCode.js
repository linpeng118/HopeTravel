import {
  VERIFY_CODE
} from 'assets/js/const'

const TIME = 60 // 倒计时时间

const verifyCode = {
  data() {
    return {
      VERIFY_CODE,
      timer: null,
      countDownTime: TIME, // 倒计时时间
      codeType: VERIFY_CODE.START, // 获取验证码/倒计时/重新获取
    }
  },
  computed: {
    showText() {
      if (this.codeType === VERIFY_CODE.START) {
        window.clearInterval(this.timer)
        return this.$t('button.getVerifyCode')
      } else if (this.codeType === VERIFY_CODE.GETTING) {
        return `${this.$t('button.sent')}（${this.countDownTime}）`
      } else {
        return this.$t('button.recapture')
      }
    }
  },
  methods: {
    /** 倒计时函数 */
    countDown() {
      this.timer = window.setInterval(() => {
        if (this.countDownTime <= 0) {
          this.codeType = VERIFY_CODE.AGAIN
          this.countDownTime = TIME
          console.log('countDownTime', this, this.countDownTime)
          window.clearInterval(this.timer)
        } else {
          this.countDownTime--
        }
      }, 1000)
    },
  }
}

export default verifyCode
