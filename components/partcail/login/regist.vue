<template>
  <div class="regist-comp">
    <h1 class="title">{{$t('partcailComp.regTips')}}</h1>
    <van-tabs class="content tours-tabs-nowrap"
      @change="changeTabs">
      <!-- 手机号注册 -->
      <van-tab class="regist"
        :title="$t('partcailComp.phoneReg')">
        <van-cell-group>
          <!-- 手机号 -->
          <area-code-input class="phone"
            :proAreaCode.sync="phoneForm.areaCode"
            :proMobile.sync="phoneForm.phone" />
          <!-- 密码 -->
          <van-field class="password tours-input"
            v-model="phoneForm.password"
            center
            clearable
            icon="eye-o"
            :placeholder="$t('partcailComp.placePassword')"
            :type="pswInputType"
            @click-icon="toggleInputType">
          </van-field>
          <!-- 验证码 -->
          <van-field class="password tours-input"
            v-model="phoneForm.smsCode"
            center
            clearable
            placeholder="验证码">
            <van-button class="tours-button-noborder"
              slot="button"
              size="small"
              @click="getCode(LOGIN_WAY.PHONE)">{{showText}}</van-button>
          </van-field>
        </van-cell-group>
      </van-tab>
      <!-- 请输入邮箱 -->
      <van-tab class="email-regist"
        :title="$t('partcailComp.emailReg')">
        <van-cell-group>
          <van-field class="email tours-input"
            v-model="emailForm.email"
            :placeholder="$t('email')" />
          <van-field class="password tours-input"
            v-model="emailForm.password"
            center
            clearable
            icon="eye-o"
            :placeholder="$t('partcailComp.placePassword')"
            :type="pswInputType"
            @click-icon="toggleInputType">
          </van-field>
          <van-field class="auth-code tours-input"
            v-model="emailForm.emailCode"
            center
            clearable
            :placeholder="$t('verifyCode')">
            <van-button class="tours-button-noborder"
              slot="button"
              size="small"
              :disabled="codeType===VERIFY_CODE.GETTING"
              @click="getCode(LOGIN_WAY.WMAIL)">{{showText}}</van-button>
          </van-field>
        </van-cell-group>
      </van-tab>
      <!-- 按钮 -->
      <div class="to-login"
        v-if="showLoginTip">
        <span>{{$t('partcailComp.hoveUser')}}</span>
        <span class="blue"
          @click="toLogin">{{$t('partcailComp.nowLogin')}}</span>
      </div>
      <van-button class="btn-regist tours-button"
        size="large"
        :disabled="!checked"
        :loading="submiting"
        @click="btnRegist">{{$t('regist')}}</van-button>
      <div class="text">
        <van-checkbox class="tour-checkbox"
          v-model="checked">
          <span @click="onAgreement">{{$t('AgreementReg')}}</span>
        </van-checkbox>
      </div>
    </van-tabs>
  </div>
</template>

<script>
  import AreaCodeInput from '@/components/input/areaCode'
  import areaCodeInput from '@/components/input/areaCode'
  import {LOGIN_WAY, VERIFY_CODE, SMS_SCENE, EMAIL_SCENE} from '@/assets/js/consts'
  import {DLG_TYPE} from '@/assets/js/consts/dialog'
  import {getSmsCode, getEmailCode, register} from '@/api/member'

  const TIME = 60 // 倒计时时间

  export default {
    name: 'regsit-comp',
    components: {
      AreaCodeInput,
      areaCodeInput,
    },
    head: {
      title: '注册'
    },
    props: {
      showLoginTip: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        VERIFY_CODE,
        // 注册类型（phone/email）
        LOGIN_WAY,
        // 默认注册方式
        type: LOGIN_WAY.PHONE,
        // 手机注册
        phoneForm: {
          areaCode: '86', // 区号
          password: '', // 密码
          phone: '', // 手机号
          smsCode: '', // 短信验证码
        },
        // 邮箱注册
        emailForm: {
          email: '',
          password: '',
          emailCode: '', // 邮箱验证码
        },
        submiting: false, // 是否可提交
        checked: false,
        pswInputType: 'password', // 密码显示与否
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
      // 切换注册模式
      changeTabs(index, title) {
        // console.log(index, title)
        // 清除定时器
        this.resetTimer()
        if (index === 1) {
          this.type = LOGIN_WAY.EMAIL
        } else {
          this.type = LOGIN_WAY.PHONE
        }
      },
      // 输入是否可见
      toggleInputType(val) {
        this.pswInputType = this.pswInputType === 'password' ? 'text' : 'password'
      },
      // 获取验证码
      async getCode(type) {
        if (type === LOGIN_WAY.PHONE && !this.phoneForm.phone) {
          this.$toast(this.$t('')'请输入手机号码')
          return
        }
        if (type === LOGIN_WAY.EMAIL && !this.emailForm.email) {
          this.$toast(this.$t('')'请输入邮箱')
          return
        }
        // 定时器
        this.codeType = VERIFY_CODE.GETTING // 获取验证码
        try {
          if (type === LOGIN_WAY.PHONE) {
            const {code, msg} = await getSmsCode({
              phone: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`,
              scene: SMS_SCENE.RGISTER
            })
            if (code !== 0) {
              this.$toast(msg)
              this.resetTimer()
            }
          } else {
            const {code, msg} = await getEmailCode({
              email: this.emailForm.email,
              scene: EMAIL_SCENE.RGISTER
            })
            if (code !== 0) {
              this.$toast(msg)
              this.resetTimer()
            }
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
      // 点击注册
      btnRegist() {
        if (this.type === LOGIN_WAY.PHONE) {
          this.registByPhone()
        } else {
          this.registByEmail()
        }
      },
      // 手机注册
      async registByPhone() {
        if (!this.phoneForm.phone) {
          this.$toast(this.$t('partcailComp.enterPhone'))
          return
        }
        if (!this.phoneForm.smsCode) {
          this.$toast(this.$t('plhdSMS'))
          return
        }
        if (!this.phoneForm.password) {
          this.$toast(this.$t('partcailComp.nodataTips'))
          return
        }
        if (this.phoneForm.password.length < 6 || this.phoneForm.password.length > 20) {
          this.$toast(this.$t('partcailComp.passEnterType'))
          return
        }
        this.submiting = true // 开始提交
        const {code, data, msg} = await register({
          type: this.type,
          account: `${this.phoneForm.areaCode}-${this.phoneForm.phone}`,
          password: this.phoneForm.password,
          password_confirm: this.phoneForm.password,
          code: this.phoneForm.smsCode
        })
        this.submiting = false
        if (code === 0) {
          this.$toast(this.$t('partcailComp.phoneRegsucess'))
          this.$emit('registCallBack')
          // fbq('track', 'CompleteRegistration')
        } else {
          this.$toast(msg)
        }
      },
      // 邮箱注册
      async registByEmail() {
        if (!this.emailForm.emailCode) {
          this.$toast(this.$t('enterEmailCode'))
          return
        }
        if (!this.emailForm.password) {
          this.$toast(this.$t('partcailComp.nodataTips'))
          return
        }
        if (this.emailForm.password.length < 6 || this.emailForm.password.length > 20) {
          this.$toast(this.$t('partcailComp.passEnterType'))
          return
        }
        this.submiting = true // 开始提交
        try {
          const {code, data, msg} = await register({
            type: this.type,
            account: this.emailForm.email,
            password: this.emailForm.password,
            password_confirm: this.emailForm.password,
            code: this.emailForm.emailCode
          })
          if (code === 0) {
            this.$toast(this.$t('partcailComp.emailRegsucess'))
            this.$emit('registCallBack')
          } else {
            this.$toast(msg)
          }
        } catch (error) {
          // console.log(error)
        }
        this.submiting = false
      },
      // 显示登录弹窗
      toLogin() {
        this.$emit('toLogin')
      },
      // 点击服务协议
      onAgreement() {
        // console.log('onAgreement')
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
  .regist-comp {
    .title {
      font-size: 40px;
      font-weight: 400;
      line-height: 56px;
      color: rgba(85, 85, 85, 1);
      opacity: 1;
    }
    .content {
      margin-top: 100px;
      // padding: 0 76px;
    }
    .regist,
    .email-regist {
      .icon-arrow {
        position: absolute;
        top: 0;
        left: 50px;
        z-index: 999;
      }
    }
    .regist {
      .phone {
        margin-top: 54px;
      }
      .password {
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
    .to-login {
      margin-top: 44px;
      font-size: 24px;
      font-weight: 300;
      color: #5e5e5e;
      .blue {
        color: rgba(57, 158, 246, 1);
      }
    }
    .btn-regist {
      margin-top: 20px;
    }
    .text {
      margin-top: 30px;
      text-align: left;
      font-size: 22px;
      span {
        color: rgba(57, 158, 246, 1);
      }
    }
  }
</style>
