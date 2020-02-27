<template>
  <div class="login-comp">

    <!-- 邮箱注册 -->
    <div class="mobile-form"
         v-if="Step==1">
      <h1 class="title"
          v-html="regTitle"></h1>

      <div class="cb-border-b">
        <van-field class="count-input"
                   v-model="emailForm.email"
                   :placeholder="$t('partcailComp.emailRegTip')" />
      </div>

      <div class="code-wrapper cb-border-b">
        <van-field class="auth-code"
                   v-model="emailForm.emailCode"
                   style=""
                   center
                   clearable
                   :placeholder="$t('partcailComp.enterPhoneCode')">
          <van-button class="btn-get-code tours-button-noborder"
                      slot="button"
                      size="small"
                      :disabled="codeType===VERIFY_CODE.GETTING"
                      @click="getCodeHandle()">{{showText}}</van-button>
        </van-field>
      </div>

      <!-- 下一步 -->
      <van-button class="btn-login"
                  size="large"
                  :disabled="disabledEmail"
                  :loading="submiting"
                  @click="verifyCodeHandle()">{{$t('partcailComp.next')}}</van-button>

      <!-- 邮箱登陆/注册 -->
      <van-row class="email-part"
               type="flex"
               align="center">
        <van-col class="email-login"
                 span="12">
        </van-col>
        <van-col @click="toLogin()"
                 class="email-reg"
                 span="12">
          {{$t('partcailComp.hoveUser')}}
          <van-icon class="icon-arrow"
                    name="arrow" />
        </van-col>
      </van-row>
    </div>

    <!-- 设置密码 -->
    <div class="mobile-form"
         v-if="Step==2">
      <h1 class="title"
          v-html="$t('partcailComp.setPass')"></h1>

      <div class="cb-border-b">
        <van-field class="password"
                   v-model="emailForm.password"
                   center
                   clearable
                   right-icon="eye-o"
                   :placeholder="$t('partcailComp.enterPass')"
                   :type="pswInputType"
                   @click-right-icon="toggleInputType()">
        </van-field>
      </div>

      <!-- 确定 -->
      <van-button class="btn-login"
                  size="large"
                  :disabled="disabledPassword"
                  :loading="submiting"
                  @click="registerHandle()">{{$t('sure')}}</van-button>
    </div>

  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import AreaCodeInput from '@/components/input/areaCode'
import {LOGIN_TYPE, VERIFY_CODE, SMS_SCENE} from '@/assets/js/consts'
import {DLG_TYPE} from '@/assets/js/consts/dialog'
import {getEmailCode, validateEmail, Emailregister} from '@/api/member'
import {getProfile} from '@/api/profile'

const TIME = 60 // 倒计时时间

export default {
  name: 'login-comp',
  head: {
    title: '登录',
  },
  components: {
    AreaCodeInput,
  },
  props: {
    regTitle: {
      type: String,
      default: '',
    },
    showRegistTip: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      VERIFY_CODE,

      pswInputType: 'password', // 密码输入框类型
      // 邮箱注册
      emailForm: {
        email: '',
        password: '',
        emailCode: '', // 邮箱验证码
      },
      submiting: false, // 是否可提交
      // 定时器
      timer: null,
      countDownTime: TIME, // 倒计时时间
      codeType: VERIFY_CODE.START, // 获取验证码/倒计时/重新获取
      profile: {},

      isAgree: true, //同意协议
      disabledEmail: true,
      disabledPassword: true,
      loginForm: 1, //1.短信登录 2.账号/邮箱登录

      Step: 1,
    }
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
        return this.$t('partcailComp.resetVerifyCode')
      }
    },
    emailValues() {
      const {emailForm, isAgree} = this
      return {
        email: emailForm.email,
        emailCode: emailForm.emailCode,
        isAgree,
      }
    },
    passwordValues() {
      const {emailForm, isAgree} = this
      return {
        password: emailForm.password,
        isAgree,
      }
    },
  },
  watch: {
    emailValues: {
      handler: function(value) {
        this.disabledEmail = value.email.length > 3 && value.emailCode.length > 3 && value.isAgree ? false : true
      },
      deep: true,
    },
    passwordValues: {
      handler: function(value) {
        this.disabledPassword = value.password.length > 5 && value.isAgree ? false : true
      },
      deep: true,
    },
    Step: function(value) {
      if (value == 2) {
        this.$emit('hideAgreement')
      }
    },
  },
  mounted() {},
  methods: {
    ...mapMutations({
      vxSetToken: 'setToken',
    }),
    toggleInputType(val) {
      this.pswInputType = this.pswInputType === 'password' ? 'text' : 'password'
    },
    // 获取验证码
    async getCodeHandle() {
      let emailR = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      if (!emailR.test(this.emailForm.email)) {
        this.$toast(this.$t('partcailComp.emailPattern'))
        return
      }
      // 倒计时状态修改
      this.codeType = VERIFY_CODE.GETTING // 获取验证码
      try {
        const {code, msg} = await getEmailCode({
          email: this.emailForm.email,
          scene: SMS_SCENE.RGISTER,
        })
        if (code !== 0) {
          this.$toast(msg)
          this.resetTimer()
        }
        await this.countDown()
      } catch (error) {
        // console.log(error)
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
    // 邮箱验证码核对
    async verifyCodeHandle() {
      let emailR = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      if (!emailR.test(this.emailForm.email)) {
        this.$toast(this.$t('partcailComp.emailPattern'))
        return
      }
      try {
        const {code, data, msg} = await validateEmail({
          scene: SMS_SCENE.RGISTER,
          account: this.emailForm.email,
          code: this.emailForm.emailCode,
        })
        if (code === 0) {
          this.Step = 2
          await this.resetTimer()
          await this.$emit('loginCallBack')
        } else {
          this.$toast(msg)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 账号/邮箱注册
    async registerHandle() {
      try {
        const {code, data, msg} = await Emailregister({
          scene: SMS_SCENE.RGISTER,
          account: this.emailForm.email,
          code: this.emailForm.emailCode,
          password: this.emailForm.password,
        })
        if (code === 0) {
          this.vxSetToken(data.token)
          await this.resetTimer()
          await this.$emit('registCallBack')
          let href = window.location.href.slice(-1)
          if (href == '#') {
            this.$router.go(-2)
          } else {
            this.$router.go(-1)
          }
        } else {
          this.$toast(msg)
        }
      } catch (error) {
        // console.log(error)
      }
    },
    // 去登录
    toLogin() {
      this.$emit('toLogin')
    },
    // 重置定时器
    resetTimer() {
      clearInterval(this.timer)
      this.codeType = VERIFY_CODE.START
      this.countDownTime = 60
    },
    //切换协议同意状态
    switchAgree(state) {
      this.isAgree = state
    },
  },
}
</script>

<style lang="scss" scoped>
.van-field__right-icon {
  color: #000 !important;
}
.login-comp {
  .title {
    font-size: 60px;
    font-weight: bold;
    color: #000000;
    text-align: left;
  }
  .sub-title {
    height: 42px;
    line-height: 42px;
    font-size: 24px;
    font-weight: 400;
    color: #909090;
    text-align: left;
  }

  .mobile-form {
    .phone {
      margin-top: 78px;
    }

    .code-wrapper {
      .auth-code {
        width: 100%;
        margin-top: 52px;
        height: 62px;
        line-height: 62px;
        padding: 0 2px;
        font-size: 28px;
      }
      .btn-get-code {
        height: 90%;
        line-height: inherit;
        padding: 0 0 0 26px;
        font-size: 28px;
        &::after {
          content: '';
          display: inline-block;
          position: absolute;
          left: -10px;
          top: calc(50% - 11px);
          height: 22px;
          width: 2px;
          background: #c4c4c4;
        }
      }
    }

    .count-input {
      margin-top: 78px;
      height: 62px;
      line-height: 62px;
      padding: 0 4px;
      font-size: 28px;
      color: #000;
    }
    .password {
      height: 62px;
      line-height: 62px;
      margin-top: 52px;
      padding: 0;
      font-size: 28px;
      color: #000;
    }
    .btn-forget {
      position: relative;
      font-size: 28px;
      color: #000;
      padding: 0;
      padding-left: 48px;
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        left: 0;
        top: calc(50% - 11px);
        height: 22px;
        width: 2px;
        background: #000000;
      }
    }
  }

  .btn-login {
    margin-top: 62px;
    width: 100%;
    height: 96px;
    background: rgba(57, 158, 246, 1);
    box-shadow: 0px 8px 12px rgba(89, 163, 227, 0.21);
    opacity: 1;
    border-radius: 48px;
    color: #fff;
    font-size: 36px;
    &[disabled] {
      background: #cddfef;
      box-shadow: 0px 8px 12px rgba(141, 141, 141, 0.16);
    }
  }
  .email-part {
    color: #909090;
    font-size: 28px;
    margin-top: 30px;
    .email-login {
      text-align: left;
    }
    .email-reg {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .icon-arrow {
        font-size: 2px;
        margin-left: 4px;
      }
    }
  }
}
</style>
