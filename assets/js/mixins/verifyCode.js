import {
  VERIFY_CODE
} from 'assets/js/consts'

const TIME = 60 // 倒计时时间

let verifyCode = {
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
        clearInterval(this.timer)
        return '获取验证码'
      } else if (this.codeType === VERIFY_CODE.GETTING) {
        return `${this.countDownTime} s`
      } else {
        clearInterval(this.timer)
        return '重新获取'
      }
    }
  },
  methods: {
    /** 倒计时函数 */
    countDown() {
      this.timer = setInterval(() => {
        console.log(this.countDownTime)
        if (this.countDownTime <= 0) {
          this.codeType = VERIFY_CODE.AGAIN
          this.countDownTime = TIME
          console.log('countDownTime', this.countDownTime)
          clearInterval(this.timer)
        } else {
          this.countDownTime--
        }
      }, 1000)
    },
  }
}

export default verifyCode
