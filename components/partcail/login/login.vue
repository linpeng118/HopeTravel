<template>
  <div class="login-comp">

    <!-- 短信快捷登录 -->
    <div class="mobile-form"
         v-if="loginForm==1">

      <h1 class="title"
          v-html="loginTitle"></h1>
      <h2 class="sub-title"
          v-if="loginSubTitle"
          v-html="loginSubTitle"></h2>

      <area-code-input class="phone"
                       :proAreaCode.sync="phoneForm.areaCode"
                       :proMobile.sync="phoneForm.phone" />

      <div class="code-wrapper cb-border-b">
        <van-field class="auth-code"
                   v-model="phoneForm.smsCode"
                   style=""
                   center
                   clearable
                   :placeholder="$t('partcailComp.enterPhoneCode')">
          <van-button class="btn-get-code tours-button-noborder"
                      slot="button"
                      size="small"
                      :disabled="codeType===VERIFY_CODE.GETTING"
                      @click="getCode">{{showText}}</van-button>
        </van-field>
      </div>

      <!-- 登录按钮 -->
      <van-button class="btn-login"
                  size="large"
                  :disabled="disabledLogin"
                  :loading="submiting"
                  @click="btnLogin()">{{$t('login')}}</van-button>

      <!-- 邮箱登陆/注册 -->
      <van-row class="email-part"
               type="flex"
               :justify="isDialog?'center':'space-between'"
               align="center">
        <van-col class="email-login"
                 span="12"
                 :style="{textAlign:isDialog?'center':'left'}"
                 @click.native="loginForm=2">
          {{$t('partcailComp.toursLogin')}}
        </van-col>
        <van-col v-if="!isDialog"
                 @click="toRegist()"
                 class="email-reg"
                 span="12">
          {{$t('partcailComp.emailReg')}}
          <van-icon class="icon-arrow"
                    name="arrow" />
        </van-col>
      </van-row>
    </div>

    <!-- 账号/邮箱登陆 -->
    <div class="mobile-form"
         v-if="loginForm==2">
      <h1 class="title"
          v-html="regTitle"></h1>

      <div class="cb-border-b">
        <van-field class="count-input"
                   v-model="formData.username"
                   :placeholder="$t('partcailComp.placeCount')" />
      </div>

      <div class="cb-border-b">
        <van-field class="password"
                   v-model="formData.password"
                   center
                   clearable
                   right-icon="eye-o"
                   :placeholder="$t('partcailComp.enterPass')"
                   :type="pswInputType"
                   @click-right-icon="toggleInputType()">
          <van-button class="btn-forget tours-button-noborder"
                      slot="button"
                      size="small"
                      @click="forgetPsw()">{{$t('partcailComp.forgetPass')}}</van-button>
        </van-field>
      </div>

      <!-- 登录按钮 -->
      <van-button class="btn-login"
                  size="large"
                  :disabled="disabledReg"
                  :loading="submiting"
                  @click="btnLogin()">{{$t('login')}}</van-button>

      <!-- 邮箱登陆/注册 -->
      <van-row class="email-part"
               type="flex"
               :justify="isDialog?'center':'space-between'"
               align="center">
        <van-col class="email-login"
                 span="12"
                 :style="{textAlign:isDialog?'center':'left'}"
                 @click.native="loginForm=1">
          {{$t('partcailComp.loginTips')}}
        </van-col>
        <van-col v-if="!isDialog"
                 @click="toRegist()"
                 class="email-reg"
                 span="12">
          {{$t('partcailComp.emailReg')}}
          <van-icon class="icon-arrow"
                    name="arrow" />
        </van-col>
      </van-row>
    </div>

  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import AreaCodeInput from '@/components/input/areaCode'
import {LOGIN_TYPE, VERIFY_CODE, SMS_SCENE} from '@/assets/js/consts'
import {DLG_TYPE} from '@/assets/js/consts/dialog'
import {getSmsCode, login} from '@/api/member'
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
    loginTitle: {
      type: String,
      default: '',
    },
    loginSubTitle: {
      type: String,
      default: '',
    },
    regTitle: {
      type: String,
      default: '',
    },
    isDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      VERIFY_CODE,

      pswInputType: 'password', // 密码输入框类型
      // 短信快捷登录
      phoneForm: {
        areaCode: '86', // 区号
        phone: '',
        smsCode: '', // 短信验证码
      },
      //账号/邮箱登录
      formData: {
        username: '',
        password: '',
      },
      submiting: false, // 是否可提交
      // 定时器
      timer: null,
      countDownTime: TIME, // 倒计时时间
      codeType: VERIFY_CODE.START, // 获取验证码/倒计时/重新获取
      profile: {},

      isAgree: true, //同意协议
      disabledLogin: true,
      disabledReg: true,
      loginForm: 1, //1.短信登录 2.账号/邮箱登录
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
    loginValues() {
      const {phoneForm, isAgree} = this
      return {
        mobile: phoneForm.phone,
        code: phoneForm.smsCode,
        isAgree,
      }
    },
    regValues() {
      const {formData, isAgree} = this
      return {
        username: formData.username,
        password: formData.password,
        isAgree,
      }
    },
  },
  watch: {
    loginValues: {
      handler: function(value) {
        this.disabledLogin = value.mobile.length > 4 && value.code.length > 3 && value.isAgree ? false : true
      },
      deep: true,
    },
    regValues: {
      handler: function(value) {
        this.disabledReg = value.username.length > 1 && value.password.length > 5 && value.isAgree ? false : true
      },
      deep: true,
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
    forgetPsw() {
      this.$router.push({path: '/reset_password'})
    },
    // 获取验证码
    async getCode() {
      if (!this.phoneForm.phone) {
        this.$toast(this.$t('partcailComp.enterPhone'))
        return
      }
      // 倒计时状态修改
      this.codeType = VERIFY_CODE.GETTING // 获取验证码
      try {
        const {code, msg} = await getSmsCode({
          phone: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`,
          scene: SMS_SCENE.LOGIN,
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
    // 登录
    btnLogin() {
      if (this.loginForm == 1) {
        this.loginByPhone()
      } else {
        this.login()
      }
    },
    // 账号/邮箱登录
    async login() {
      if (!this.formData.username) {
        this.$toast(this.$t('partcailComp.enterUsername'))
        return
      }
      if (!this.formData.password) {
        this.$toast(this.$t('partcailComp.enterPass'))
        return
      }
      try {
        const {code, data, msg} = await login({
          type: 'password',
          account: this.formData.username,
          password: this.formData.password,
        })
        if (code === 0) {
          this.vxSetToken(data.token)
          await this.resetTimer()
          await this.$emit('loginCallBack')
        } else {
          this.$toast(msg)
        }
      } catch (error) {
        // console.log(error)
      }
    },
    // 短信登录
    async loginByPhone() {
      if (!this.phoneForm.phone) {
        this.$toast(this.$t('partcailComp.enterPhone'))
        return
      }
      if (!this.phoneForm.smsCode) {
        this.$toast(this.$t('partcailComp.enterPhoneCode'))
        return
      }
      try {
        const {code, data, msg} = await login({
          type: 'phone',
          account: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`,
          password: this.phoneForm.password,
          code: this.phoneForm.smsCode,
        })
        if (code === 0) {
          // console.log(data.token)
          await this.vxSetToken(data.token)
          await this.resetTimer()
          await this.$emit('loginCallBack')
        } else {
          this.$toast(msg)
        }
      } catch (error) {
        // console.log(error)
      }
    },
    // 去注册
    toRegist() {
      this.$emit('toRegist')
    },
    // 点击服务协议
    onAgreement() {
      this.$router.push({
        path: '/protocol/user',
      })
      this.$emit('onAgreement')
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
