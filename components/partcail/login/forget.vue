<template>
  <div class="forget-comp">
    <h1 class="title">{{$t('partcailComp.forgetPassTips')}}</h1>
    <van-tabs class="content forget-wrap tours-tabs-nowrap"
      @change="changeTabs">
      <!-- 手机号 -->
      <van-tab class="regist"
        :title="$t('phoneNumber')">
        <van-cell-group>
          <area-code-input class="phone"
            :proAreaCode.sync="phoneForm.areaCode"
            :proMobile.sync="phoneForm.phone" />
          <van-field class="sms-code tours-input"
            v-model="phoneForm.smsCode"
            center
            clearable
            :placeholder="$t('verifyCode')">
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
          @click="toNextByPhone">{{$t('partcailComp.next')}}</van-button>
      </van-tab>
      <!-- 邮箱 -->
      <van-tab class="email-regist"
        :title="$t('email')">
        <van-cell-group>
          <van-field class="email tours-input"
            v-model="emailForm.email"
            :placeholder="$t('email')" />
          <van-field class="auth-code tours-input"
            v-model="emailForm.emailCode"
            center
            clearable
            :placeholder="$t('verifyCode')">
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
          @click="toNextByEmail">{{$t('partcailComp.next')}}</van-button>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import areaCodeInput from '@/components/input/areaCode'
  import {LOGIN_WAY, VERIFY_CODE, SMS_SCENE, EMAIL_SCENE} from '@/assets/js/consts'
  import {getSmsCode, getEmailCode} from '@/api/member'

  const TIME = 60 // 倒计时时间

  export default {
    layout: 'default',
    head: {
      title: '忘记密码'
    },
    components: {
      areaCodeInput
    },
    data() {
      return {
        VERIFY_CODE,
        redirect: this.$route.query.redirect,
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
          return this.$t('getVerifyCode')
        } else if (this.codeType === VERIFY_CODE.GETTING) {
          return `${this.countDownTime} s`
        } else {
          clearInterval(this.timer)
          return this.$t('partcailComp.resetVerifyCode')
        }
      }
    },
    mounted() {},
    methods: {
      ...mapMutations({
        vxSetForgetForm: 'login/setForgetForm'
      }),
      // 切换找回密码的方式
      changeTabs(index, title) {
        // 清除定时器
        this.resetTimer()
        if (index === 1) {
          this.type = LOGIN_WAY.EMAIL
        } else {
          this.type = LOGIN_WAY.PHONE
        }
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
          this.$toast(this.$t('partcailComp.enterEmail'))
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
          this.$toast(this.$t('partcailComp.enterPhone'))
          return
        }
        if (!this.phoneForm.smsCode) {
          this.$toast(this.$t('partcailComp.enterPhoneCode'))
          return
        }
        // 存数据
        await this.vxSetForgetForm({
          ...this.phoneForm,
          type: this.type
        })
        // 清除定时器
        this.resetTimer()
        // 执行回调
        this.callCallback()
      },
      // 使用邮箱找回（验证邮箱）
      async toNextByEmail() {
        if (!this.emailForm.email) {
          this.$toast(this.$t('partcailComp.enterEmail'))
          return
        }
        if (!this.emailForm.emailCode) {
          this.$toast(this.$t('enterEmailCode'))
          return
        }
        // 存数据
        await this.vxSetForgetForm({
          ...this.emailForm,
          type: this.type
        })
        // 清除定时器
        this.resetTimer()
        // 执行回调
        this.callCallback()
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
      }
    },
  }
</script>

<style lang="scss" scoped>
  .forget-comp {
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
    .regist,
    .email-regist {
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
</style>
