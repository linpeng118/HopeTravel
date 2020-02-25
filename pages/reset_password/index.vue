<template>
  <div class="reset-password">

    <!-- 页面关闭按钮 -->
    <van-icon @click="btnLeft()"
              name="cross"
              class="close-btn" />

    <div class="code-form"
         v-if="Step==1">

      <h1 class="title"
          v-html="$t('partcailComp.forgetPassTips')"></h1>

      <!-- 手机重置密码 -->
      <div class="mobile-form"
           v-if="formStyle==1">

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
                        @click="getPhoneCode()">{{showText}}</van-button>
          </van-field>
        </div>

        <!-- 下一步 -->
        <van-button class="btn-login"
                    size="large"
                    :disabled="disabledMobile"
                    :loading="submiting"
                    @click="toNextHandle()">{{$t('partcailComp.next')}}</van-button>

        <!-- 邮箱登陆/注册 -->
        <van-row class="email-part"
                 type="flex"
                 align="center">
          <van-col class="email-login"
                   @click="changeTabs(2)"
                   span="12">
            {{$t('partcailComp.patternEmail')}}
          </van-col>
        </van-row>
      </div>

      <!-- 邮箱重置密码 -->
      <div class="mobile-form"
           v-if="formStyle==2">

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
                        @click="getEmailCode()">{{showText}}</van-button>
          </van-field>
        </div>

        <!-- 下一步 -->
        <van-button class="btn-login"
                    size="large"
                    :disabled="disabledEmail"
                    :loading="submiting"
                    @click="toNextHandle()">{{$t('partcailComp.next')}}</van-button>

        <!-- 邮箱登陆/注册 -->
        <van-row class="email-part"
                 type="flex"
                 align="center">
          <van-col class="email-login"
                   @click="changeTabs(1)"
                   span="12">
            {{$t('partcailComp.patternMobile')}}
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- 设置密码 -->
    <div class="mobile-form"
         v-if="Step==2">
      <h1 class="title"
          v-html="$t('partcailComp.setPass')"></h1>

      <div class="cb-border-b set-password">
        <van-field class="password"
                   v-model="password"
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
                  :disabled="password.length<6"
                  :loading="submiting"
                  @click="resetHandle()">{{$t('sure')}}</van-button>
    </div>

  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import areaCodeInput from '@/components/input/areaCode'
import {LOGIN_WAY, VERIFY_CODE, SMS_SCENE, EMAIL_SCENE} from '@/assets/js/consts'
import {getSmsCode, getEmailCode, validateEmail, findPwd} from '@/api/member'

const TIME = 60 // 倒计时时间

export default {
  layout: 'default',
  head: {
    title: '忘记密码',
  },
  components: {
    areaCodeInput,
  },
  data() {
    return {
      VERIFY_CODE,
      redirect: this.$route.query.redirect, // 重定向地址
      // 默认找回密码方式
      type: LOGIN_WAY.PHONE,
      // 手机找回密码
      phoneForm: {
        areaCode: '86', // 区号
        phone: '',
        smsCode: '', // 验证码
      },
      submiting: false, // 是否正提交
      pswInputType: 'password',
      // 邮箱找回密码
      emailForm: {
        email: '',
        emailCode: '', // 邮箱验证码
      },
      password: '',
      // 定时器
      timer: null,
      countDownTime: TIME, // 倒计时时间
      codeType: VERIFY_CODE.START, // 获取验证码/倒计时/重新获取

      disabledEmail: true,
      disabledMobile: true,

      Step: 1,
      formStyle: 1,
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
      const {emailForm} = this
      return {
        email: emailForm.email,
        emailCode: emailForm.emailCode,
      }
    },
    mobileValues() {
      const {phoneForm} = this
      return {
        phone: phoneForm.phone,
        smsCode: phoneForm.smsCode,
      }
    },
  },
  watch: {
    emailValues: {
      handler: function(value) {
        this.disabledEmail = value.email.length > 3 && value.emailCode.length > 3 ? false : true
      },
      deep: true,
    },
    mobileValues: {
      handler: function(value) {
        this.disabledMobile = value.phone.length > 3 && value.smsCode.length > 3 ? false : true
      },
      deep: true,
    },
  },
  mounted() {},
  methods: {
    ...mapMutations({
      vxSetForgetForm: 'login/setForgetForm',
    }),
    // 头部按钮（左）【返回】
    btnLeft() {
      // 如果游重定向地址
      if (this.redirect) {
        this.$router.replace({
          path: this.redirect,
          query: {
            redirect: 'personal',
          },
        })
      } else {
        let href = window.location.href.slice(-1)
        if (href == '#') {
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      }
    },
    // 切换密码显示
    toggleInputType(val) {
      this.pswInputType = this.pswInputType === 'password' ? 'text' : 'password'
    },
    // 切换找回密码的方式
    changeTabs(index) {
      // 清除定时器
      this.resetTimer()
      this.formStyle = index
    },
    // 获取手机验证码
    async getPhoneCode() {
      if (!this.phoneForm.phone) {
        this.$toast(this.$t('partcailComp.enterPhone'))
        return
      }
      // 定时器
      this.codeType = VERIFY_CODE.GETTING // 获取验证码
      try {
        const {code, msg} = await getSmsCode({
          phone: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`,
          scene: SMS_SCENE.RSPWD,
        })
        if (code == 0) {
          this.countDown()
        } else {
          this.$toast(msg)
          this.resetTimer()
        }
      } catch (error) {
        console.log(error)
        this.codeType = VERIFY_CODE.START
      }
    },
    // 获取邮箱验证码
    async getEmailCode() {
      let emailR = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      if (!emailR.test(this.emailForm.email)) {
        this.$toast(this.$t('partcailComp.emailPattern'))
        return
      }
      // 定时器
      this.codeType = VERIFY_CODE.GETTING // 获取验证码
      try {
        const {code, msg} = await getEmailCode({
          email: this.emailForm.email,
          scene: EMAIL_SCENE.RSPWD,
        })
        if (code == 0) {
          this.countDown()
        } else {
          this.$toast(msg)
          this.resetTimer()
        }
      } catch (error) {
        console.log(error)
        this.codeType = VERIFY_CODE.START
      }
    },
    // 开始倒计时
    countDown() {
      this.timer = setInterval(() => {
        if (this.countDownTime <= 0) {
          this.codeType = VERIFY_CODE.AGAIN
          this.countDownTime = TIME
          clearInterval(this.timer)
        } else {
          this.countDownTime--
        }
      }, 1000)
    },
    // 使用手机号找回（验证手机号）
    async toNextHandle() {
      // 构造数据
      let subData = {}
      if (this.formStyle == 1) {
        subData = {
          account: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`,
          code: this.phoneForm.smsCode,
          scene: 'resetPassword',
        }
      } else {
        subData = {
          account: this.emailForm.email,
          code: this.emailForm.emailCode,
          scene: 'resetPassword',
        }
      }
      try {
        const {code, data, msg} = await validateEmail(subData)
        if (code == 0) {
          this.Step = 2
          // 清除定时器
          this.resetTimer()
        } else {
          this.$toast(msg)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 跳转至修改密码
    callCallback() {
      this.$emit('nextCallBack')
    },
    // 重置定时器
    resetTimer() {
      clearInterval(this.timer)
      this.codeType = VERIFY_CODE.START
      this.countDownTime = 60
    },
    async resetHandle() {
      if (!this.password) {
        this.$toast(this.$t('partcailComp.nodataTips'))
      }
      // 构造数据
      let subData = {}
      if (this.formStyle == 1) {
        subData = {
          account: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`,
          code: this.phoneForm.smsCode,
          password: this.password,
        }
      } else {
        subData = {
          account: this.emailForm.email,
          code: this.emailForm.emailCode,
          password: this.password,
        }
      }
      // 请求接口
      try {
        const {code, data, msg} = await findPwd(subData)
        if (code === 0) {
          this.$toast(`${this.$t('partcailComp.updateSuccess')}！`)
          this.btnLeft()
          setTimeout(() => {
            try {
              fbq('track', 'Lead')
            } catch (error) {
              console.log(error)
            }
          }, 1000)
        } else {
          this.$toast(msg)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.van-field__right-icon {
  color: #000 !important;
}
.reset-password {
  height: 100%;
  min-height: 100vh;
  padding: 174px 72px 0;
  position: relative;

  .close-btn {
    position: absolute;
    left: 62px;
    top: 36px;
    color: #000;
    font-size: 36px;
  }
  .title {
    font-size: 60px;
    font-weight: bold;
    color: #000000;
    text-align: left;
  }

  .mobile-form {
    .phone {
      margin-top: 78px;
    }

    .set-password {
      margin-top: 226px;
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
