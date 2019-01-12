<template>
  <div class="login-page">
    <h1 class="title">稀饭旅行账号登陆</h1>
    <van-tabs class="login-wrap tours-tabs-nowrap">
      <!-- 普通登陆 -->
      <van-tab class="login"
        title="普通登陆">
        <van-cell-group>
          <van-field class="username tours-input"
            v-model="username"
            placeholder="请输入用户名" />
          <van-field class="password tours-input"
            v-model="password"
            center
            clearable
            icon="eye-o"
            placeholder="请输入密码"
            :type="pswInputType"
            @click-icon="toggleInputType">
            <van-button class="tours-button-noborder"
              slot="button"
              size="small"
              @click="forgetPsw">忘记密码</van-button>
          </van-field>
        </van-cell-group>
        <van-button class="btn-login tours-button"
          size="large"
          :disabled="!isNameOk"
          @click="login">登陆</van-button>
      </van-tab>
      <!-- 手机验证码登陆 -->
      <van-tab class="mobile-login"
        title="手机验证码登陆">
        <van-cell-group>
          <area-code-input class="mobile"
            :proMobile.sync="mobile" />
          <van-field class="auth-code tours-input"
            v-model="authCode"
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
          :disabled="!isMobileOk"
          @click="mobileLogin">登陆</van-button>
      </van-tab>
      <p class="text">登陆即代表您已同意我们的<span @click="onAgreement">&nbsp;服务协议</span></p>
    </van-tabs>
  </div>
</template>

<script>
  import AreaCodeInput from '@/components/input/areaCode'

  export default {
    components: {
      AreaCodeInput
    },
    data() {
      return {
        // 用户登录
        username: '',
        password: '',
        pswInputType: 'password', // 密码输入框类型
        isNameOk: false, // 验证用户名是否ok
        // 手机登录
        mobile: '',
        isMobileOk: false, // 验证手机号是否ok
        authCode: '', // 验证码
        areaCode: '86', // 区号
        show: false,
      }
    },
    computed: {},
    mounted() {},
    methods: {
      toggleInputType(val) {
        this.pswInputType = this.pswInputType === 'password' ? 'text' : 'password'
      },
      forgetPsw() {
        this.$router.push({
          path: '/login/forget'
        })
      },
      // 获取验证码
      getCode() {
        // TODO:
      },
      onAreaCode() {
        console.log(123)
      },
      login() {
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
  .login-page {
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
    .login-wrap {
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
        .btn-login {
          margin-top: 20px;
        }
      }
      .login {
        .username {
          margin-top: 54px;
        }
        .password {
          margin-top: 16px;
        }
      }
      .mobile-login {
        .mobile {
          margin-top: 54px;
        }
        .auth-code {
          margin-top: 16px;
        }
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
  }
</style>