<template>
  <div class="login-comp">
    <h1 class="title">{{$t('partcailComp.loginTips')}}</h1>
    <van-tabs class="content tours-tabs-nowrap"
              @change="changeTabs">
      <!-- 手机验证码登录 -->
      <van-tab class="mobile-login"
               :title="$t('partcailComp.phoneCodeLogin')">
        <van-cell-group>
          <area-code-input class="phone"
                           :proAreaCode.sync="phoneForm.areaCode"
                           :proMobile.sync="phoneForm.phone" />
          <van-field class="auth-code tours-input"
                     v-model="phoneForm.smsCode"
                     center
                     clearable
                     :placeholder="$t('verifyCode')">
            <van-button class="btn-get-code tours-button-noborder"
                        slot="button"
                        size="small"
                        :disabled="codeType===VERIFY_CODE.GETTING"
                        @click="getCode">{{showText}}</van-button>
          </van-field>
        </van-cell-group>
      </van-tab>
      <!-- 普通登录 -->
      <van-tab class="login"
               :title="$t('partcailComp.ptlogin')">
        <van-cell-group>
          <van-field class="username tours-input"
                     v-model="formData.username"
                     :placeholder="$t('plhdNameEmail')" />
          <van-field class="password tours-input"
                     v-model="formData.password"
                     center
                     clearable
                     icon="eye-o"
                     :placeholder="$t('partcailComp.placePassword')"
                     :type="pswInputType"
                     @click-icon="toggleInputType">
            <van-button class="btn-forget tours-button-noborder"
                        slot="button"
                        size="small"
                        @click="forgetPsw">{{$t('partcailComp.forgetPass')}}</van-button>
          </van-field>
        </van-cell-group>
      </van-tab>
      <!-- 按钮 -->
      <div class="to-regist"
           v-if="showRegistTip">
        <span>{{$t('partcailComp.notUser')}}？</span>
        <span class="blue"
              @click="toRegist">{{$t('partcailComp.toreg')}}</span>
      </div>
      <van-button class="btn-login tours-button"
                  size="large"
                  :loading="submiting"
                  @click="btnLogin">{{$t('login')}}</van-button>
      <p class="text">{{$t('partcailComp.AgreementLogin')}}<span @click="onAgreement">&nbsp;{{$t('partcailComp.AgreementName')}}</span></p>
    </van-tabs>
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
    showRegistTip: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      VERIFY_CODE,
      type: LOGIN_TYPE.PHONE, // 默认登录模式
      formData: {
        username: '',
        password: '',
      },
      pswInputType: 'password', // 密码输入框类型
      // 手机登录
      phoneForm: {
        areaCode: '86', // 区号
        phone: '',
        smsCode: '', // 短信验证码
      },
      submiting: false, // 是否可提交
      // 定时器
      timer: null,
      countDownTime: TIME, // 倒计时时间
      codeType: VERIFY_CODE.START, // 获取验证码/倒计时/重新获取
      profile: {},
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
  },
  mounted() {},
  methods: {
    ...mapMutations({
      vxSetToken: 'setToken',
    }),
    // 切换登录模式
    changeTabs(index, title) {
      // console.log(index, title)
      // 清除定时器
      this.resetTimer()
      if (index === 1) {
        this.type = LOGIN_TYPE.PASSWORD
      } else {
        this.type = LOGIN_TYPE.PHONE
      }
    },
    toggleInputType(val) {
      this.pswInputType = this.pswInputType === 'password' ? 'text' : 'password'
    },
    forgetPsw() {
      this.$emit('forgetPswCallBack')
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
      if (this.type === LOGIN_TYPE.PHONE) {
        this.loginByPhone()
      } else {
        this.login()
      }
    },
    // 普通登录
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
          type: this.type,
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
    // 手机登录
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
          type: this.type,
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
  },
}
</script>

<style lang="scss" scoped>
.login-comp {
  .title {
    font-size: 40px;
    font-weight: 400;
    line-height: 56px;
    color: rgba(85, 85, 85, 1);
    opacity: 1;
  }
  .content {
    margin-top: 100px;
  }
  .login,
  .mobile-login {
    .icon-arrow {
      position: absolute;
      top: 0;
      left: 50px;
      z-index: 999;
    }
  }
  .login {
    .username {
      margin-top: 54px;
    }
    .password {
      margin-top: 16px;
    }
    .btn-forget {
      position: relative;
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        left: -5px;
        top: 12px;
        height: 60px;
        width: 2px;
        background: #c4c4c4;
      }
    }
  }
  .mobile-login {
    .phone {
      margin-top: 54px;
    }
    .auth-code {
      margin-top: 16px;
    }
    .btn-get-code {
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        left: -10px;
        top: 12px;
        height: 60px;
        width: 2px;
        background: #c4c4c4;
      }
    }
  }
  .to-regist {
    margin-top: 44px;
    font-size: 24px;
    font-weight: 300;
    color: #5e5e5e;
    .blue {
      color: rgba(57, 158, 246, 1);
    }
  }
  .btn-login {
    margin-top: 20px;
  }
  .text {
    margin-top: 30px;
    font-size: 22px;
    color: #c4c4c4;
    span {
      color: rgba(57, 158, 246, 1);
    }
  }
}
</style>
