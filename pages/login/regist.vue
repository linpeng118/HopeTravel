<template>
  <div class="regist-page">
    <login-header rightText="登录"
      @callOnRigth="toLogin" />
    <h1 class="title">稀饭旅行账号注册</h1>
    <van-tabs class="regist-wrap tours-tabs-nowrap">
      <!-- 手机号注册 -->
      <van-tab class="regist"
        title="手机号注册">
        <van-cell-group>
          <area-code-input class="mobile"
            :proMobile.sync="mobile" />
          <van-field class="password tours-input"
            v-model="password"
            center
            clearable
            icon="eye-o"
            placeholder="请输入密码"
            :type="pswInputType"
            @click-icon="toggleInputType">
          </van-field>
          <van-field class="password tours-input"
            v-model="smsCode"
            center
            clearable
            placeholder="请输入验证码">
            <van-button class="tours-button-noborder"
              slot="button"
              size="small"
              @click="getCode">获取验证码</van-button>
          </van-field>
        </van-cell-group>
        <van-button class="btn-login tours-button"
          size="large"
          :disabled="!canSubmit"
          @click="regist">注册</van-button>
      </van-tab>
      <!-- 请输入邮箱 -->
      <van-tab class="email-regist"
        title="请输入邮箱">
        <van-cell-group>
          <van-field class="email tours-input"
            v-model="email"
            placeholder="请输入邮箱" />
          <van-field class="password tours-input"
            v-model="password"
            center
            clearable
            icon="eye-o"
            placeholder="请输入密码"
            :type="pswInputType"
            @click-icon="toggleInputType">
          </van-field>
          <van-field class="auth-code tours-input"
            v-model="emailCode"
            center
            clearable
            placeholder="请输入验证码">
            <van-button class="tours-button-noborder"
              slot="button"
              size="small"
              @click="getCode">获取验证码</van-button>
          </van-field>
        </van-cell-group>
        <van-button class="btn-login tours-button"
          size="large"
          :disabled="!canSubmit"
          @click="mobileLogin">注册</van-button>
      </van-tab>
      <p class="text">
        <van-checkbox class="tour-checkbox"
          v-model="checked">
          <span @click="onAgreement">我已经阅读并同意《服务协议》</span>
        </van-checkbox>
      </p>
    </van-tabs>
  </div>
</template>

<script>
  import loginHeader from '@/components/header/loginHeader'
  import areaCodeInput from '@/components/input/areaCode'

  export default {
    components: {
      loginHeader,
      areaCodeInput
    },
    data() {
      return {
        // 手机注册
        mobile: '',
        canSubmit: false, // 是否可提交
        areaCode: '86', // 区号
        smsCode: '', // 短信验证码
        emailCode: '', // 邮箱验证码
        show: false,
        checked: false,
        pswInputType: 'password',
        // 邮箱注册
        email: '',
        password: '',
      }
    },
    computed: {},
    mounted() {},
    methods: {
      // 跳转至登录页
      toLogin() {
        this.$router.push({
          path: '/login'
        })
      },
      toggleInputType(val) {
        this.pswInputType = this.pswInputType === 'password' ? 'text' : 'password'
      },
      forgetPsw() {
        this.$router.push({
          path: '/regist/forget'
        })
      },
      // 获取验证码
      getCode() {
        // TODO:
      },
      onAreaCode() {
        console.log(123)
      },
      regist() {
        console.log(1)
      },
      mobileLogin() {
        console.log(2, this.mobile)
      },
      // 点击服务协议
      onAgreement() {
        console.log('onAgreement')
      }
    },
  }
</script>

<style lang="scss" scoped>
  .regist-page {
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
    .regist-wrap {
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
        .mobile {
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
      .text {
        margin-top: 30px;
        padding: 0 76px;
        text-align: left;
        font-size: 22px;
        span {
          color: rgba(57, 158, 246, 1);
        }
      }
    }
  }
</style>