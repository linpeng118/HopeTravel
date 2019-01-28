<template>
  <div class="forget-page">
    <login-header rightText="登录"
      @callOnRigth="toLogin" />
    <h1 class="title">别担心，在这里找回密码</h1>
    <van-tabs class="forget-wrap tours-tabs-nowrap"
      @change="changeTabs">
      <!-- 手机号 -->
      <van-tab class="regist"
        title="手机号">
        <van-cell-group>
          <area-code-input class="phone"
            :proAreaCode.sync="phoneForm.areaCode"
            :proMobile.sync="phoneForm.phone" />
          <van-field class="sms-code tours-input"
            v-model="phoneForm.smsCode"
            center
            clearable
            placeholder="验证码">
            <van-button class="tours-button-noborder"
              slot="button"
              size="small"
              :disabled="codeType===VERIFY_CODE.GETTING"
              @click="getPhoneCode">{{showText}}</van-button>
          </van-field>
        </van-cell-group>
        <van-button class="btn-login tours-button"
          size="large"
          :loading="submiting"
          @click="toNextByPhone">下一步</van-button>
      </van-tab>
      <!-- 邮箱 -->
      <van-tab class="email-regist"
        title="邮箱">
        <van-cell-group>
          <van-field class="email tours-input"
            v-model="emailForm.email"
            placeholder="邮箱" />
          <van-field class="auth-code tours-input"
            v-model="emailForm.emailCode"
            center
            clearable
            placeholder="验证码">
            <van-button class="tours-button-noborder"
              slot="button"
              size="small"
              :disabled="codeType===VERIFY_CODE.GETTING"
              @click="getEmailCode">{{showText}}</van-button>
          </van-field>
        </van-cell-group>
        <van-button class="btn-login tours-button"
          size="large"
          :loading="submiting"
          @click="toNextByEmail">下一步</van-button>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import loginHeader from '@/components/header/loginHeader'
  import areaCodeInput from '@/components/input/areaCode'
  import {LOGIN_WAY, VERIFY_CODE, SMS_SCENE, EMAIL_SCENE} from '@/assets/js/consts'
  import {getSmsCode, getEmailCode} from '@/api/member'

  const TIME = 60 // 倒计时时间

  export default {
    layout: 'default',
    components: {
      loginHeader,
      areaCodeInput
    },
    data() {
      return {
        VERIFY_CODE,
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
        // 定时器
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
    mounted() {},
    methods: {
      ...mapMutations({
        vxSetForgetForm: 'login/setForgetForm'
      }),
      // 跳转至登录页
      toLogin() {
        this.$router.push({
          path: '/login'
        })
      },
      // 切换找回密码的方式
      changeTabs(index, title) {
        console.log(index, title)
        // 清除定时器
        this.resetTimer()
        if (index === 1) {
          this.type = LOGIN_WAY.EMAIL
        } else {
          this.type = LOGIN_WAY.PHONE
        }
      },
      toggleInputType(val) {
        this.pswInputType = this.pswInputType === 'password' ? 'text' : 'password'
      },
      // 获取手机验证码
      async getPhoneCode() {
        if (!this.phoneForm.phone) {
          this.$toast('请输入手机号码')
          return
        }
        // 定时器
        this.codeType = VERIFY_CODE.GETTING // 获取验证码
        try {
          await getSmsCode({
            phone: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`,
            scene: SMS_SCENE.RSPWD
          })
          await this.countDown()
        } catch (error) {
          console.log(error)
          this.codeType = VERIFY_CODE.START
        }
      },
      // 获取邮箱验证码
      async getEmailCode() {
        if (!this.emailForm.email) {
          this.$toast('请输入邮箱号码')
          return
        }
        // 定时器
        this.codeType = VERIFY_CODE.GETTING // 获取验证码
        try {
          await getEmailCode({
            email: this.emailForm.email,
            scene: EMAIL_SCENE.RSPWD
          })
          await this.countDown()
        } catch (error) {
          console.log(error)
          this.codeType = VERIFY_CODE.START
        }
      },
      // 开始倒计时
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
      // 使用手机号找回（验证手机号）
      async toNextByPhone() {
        if (!this.phoneForm.phone) {
          this.$toast('请输入手机号码')
          return
        }
        if (!this.phoneForm.smsCode) {
          this.$toast('请输入手机验证码')
          return
        }
        // 验证
        await this.vxSetForgetForm({
          ...this.phoneForm,
          type: this.type
        })
        // 清除定时器
        this.resetTimer()
        // 跳转
        this.toChangePsw()

      },
      // 使用邮箱找回（验证邮箱）
      async toNextByEmail() {
        if (!this.emailForm.email) {
          this.$toast('请输入邮箱号码')
          return
        }
        if (!this.emailForm.emailCode) {
          this.$toast('请输入邮箱验证码')
          return
        }
        // 验证
        await this.vxSetForgetForm({
          ...this.emailForm,
          type: this.type
        })
        // 清除定时器
        this.resetTimer()
        // 跳转
        this.toChangePsw()
      },
      toChangePsw() {
        this.$router.push({
          path: '/login/findPsw',
        })
      },
      // 重置定时器
      resetTimer() {
        clearInterval(this.timer)
        this.codeType = VERIFY_CODE.START
        this.countDownTime = 60
      }
    },
  }
</script>

<style lang="scss" scoped>
  .forget-page {
    text-align: center;
    .title {
      padding-top: 136px;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 56px;
      color: rgba(85, 85, 85, 1);
      opacity: 1;
    }
    .forget-wrap {
      margin-top: 100px;
      .regist,
      .email-regist {
        padding: 0 76px;
        .icon-arrow {
          position: absolute;
          top: 0;
          left: 50px;
          z-index: 999;
        }
        .btn-login {
          margin-top: 20px;
        }
      }
      .regist {
        .phone {
          margin-top: 54px;
        }
        .sms-code {
          margin-top: 16px;
        }
      }
      .email-regist {
        .email {
          margin-top: 54px;
        }
        .password {
          margin-top: 16px;
        }
        .auth-code {
          margin-top: 16px;
        }
      }
    }
  }
</style>