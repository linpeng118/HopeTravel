<template>
  <van-tabs class="login-comp tours-tabs-nowrap">
    <!-- 普通登陆 -->
    <van-tab class="login"
      title="普通登陆">
      <van-cell-group>
        <van-field class="username tours-input"
          v-model="formData.username"
          placeholder="请输入用户名" />
        <van-field class="password tours-input"
          v-model="formData.password"
          center
          clearable
          icon="eye-o"
          placeholder="请输入密码"
          :type="pswInputType"
          @click-icon="toggleInputType">
          <van-button class="btn-forget tours-button-noborder"
            slot="button"
            size="small"
            @click="forgetPsw">忘记密码</van-button>
        </van-field>
      </van-cell-group>
    </van-tab>
    <!-- 手机验证码登陆 -->
    <van-tab class="mobile-login"
      title="手机验证码登陆">
      <van-cell-group>
        <area-code-input class="mobile"
          :proMobile.sync="formPhone.mobile" />
        <van-field class="auth-code tours-input"
          v-model="formPhone.authCode"
          center
          clearable
          placeholder="请输入验证码">
          <van-button class="btn-get-code tours-button-noborder"
            slot="button"
            size="small"
            :disabled="codeType===VERIFY_CODE.GETTING"
            @click="getCode">{{showText}}</van-button>
        </van-field>
      </van-cell-group>
    </van-tab>
    <!-- 按钮 -->
    <div class="to-regist" v-if="showRegist">
      <span>还没有账号？</span>
      <span class="blue" @click="showRegistDlg">去注册</span>
    </div>
    <van-button class="btn-login tours-button"
      size="large"
      :disabled="!isNameOk"
      @click="login">登录</van-button>
    <p class="text">登陆即代表您已同意我们的<span @click="onAgreement">&nbsp;服务协议</span></p>
  </van-tabs>
</template>

<script>
  import AreaCodeInput from '@/components/input/areaCode'
  import {VERIFY_CODE} from '@/assets/js/consts'

  const TIME = 60 // 倒计时时间

  export default {
    components: {
      AreaCodeInput,
    },
    props: {
      showRegist: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        VERIFY_CODE,
        formData: {
          username: '',
          password: '',
        },
        pswInputType: 'password', // 密码输入框类型
        isNameOk: false, // 验证用户名是否ok
        // 手机登录
        formPhone: {
          areaCode: '86', // 区号
          mobile: '',
          code: '', // 验证码
        },
        timer: null,
        countDownTime: TIME, // 倒计时时间
        codeType: VERIFY_CODE.START, // 获取验证码/倒计时/重新获取
        isPhoneOk: false, // 验证手机号是否ok
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
      // 显示注册弹窗
      showRegistDlg() {
        this.$emit('showRegistDlg')
      },
      toggleInputType(val) {
        this.pswInputType = this.pswInputType === 'password' ? 'text' : 'password'
      },
      forgetPsw() {
        this.$router.push({
          path: '/login/forget'
        })
      },
      // 获取验证码
      async getCode() {
        this.codeType = VERIFY_CODE.GETTING // 获取验证码
        // 提交
        try {
          // await this.getVerifyCode({
          //   mobile: this.formPhone.mobile,
          //   areaCode: this.formPhone.areaCode,
          //   code: this.formPhone.code,
          // })
          await this.countDown()
        } catch (error) {
          console.log(error)
          this.codeType = VERIFY_CODE.START
        }
      },
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
      onAreaCode() {},
      login() {},
      mobileLogin() {},
      // 点击服务协议
      onAgreement() {
        this.$router.push({
          path: '/protocol'
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .login-comp {
    margin-top: 100px;
    .login,
    .mobile-login {
      padding: 0 76px;
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
          content: "";
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
      .mobile {
        margin-top: 54px;
      }
      .auth-code {
        margin-top: 16px;
      }
      .btn-get-code {
        &::after {
          content: "";
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
      margin-top: 84px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 300;
      color: #5e5e5e;
      .blue {
        color: rgba(57, 158, 246, 1);
      }
    }
    .btn-login {
      margin-top: 20px;
      width: 596px;
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