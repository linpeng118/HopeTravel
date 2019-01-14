<template>
  <div class="forget-page">
    <login-header rightText="登录"
      @callOnRigth="toLogin" />
    <h1 class="title">别担心，在这里找回密码</h1>
    <van-tabs class="forget-wrap tours-tabs-nowrap">
      <!-- 手机号 -->
      <van-tab class="regist"
        title="手机号">
        <van-cell-group>
          <area-code-input class="mobile"
            :proMobile.sync="mobile" />
          <van-field class="password tours-input"
            v-model="password"
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
          @click="toNext">下一步</van-button>
      </van-tab>
      <!-- 邮箱 -->
      <van-tab class="email-regist"
        title="邮箱">
        <van-cell-group>
          <van-field class="email tours-input"
            v-model="email"
            placeholder="请输入邮箱" />
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
          :disabled="!canSubmit"
          @click="toNext">下一步</van-button>
      </van-tab>
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
        authCode: '', // 验证码
        show: false,
        checked: true,
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
      // 获取验证码
      getCode() {
        // TODO:
      },
      onAreaCode() {
        console.log(123)
      },
      // 下一步
      toNext() {
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
    }
  }
</style>